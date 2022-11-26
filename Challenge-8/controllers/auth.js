const { user_game } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SIGNATURE_KEY } = process.env
const roles = require('../utils/roles')
const passport = require('../utils/passport')
const oauth2 = require('../utils/google')
const userEnum = require('../utils/enum')
const utils = require('../utils/email')

module.exports = {
    google: async (req, res, next) => {
        try {
            const code = req.query.code

            // form login if no code
            if (!code) {
                const url = oauth2.generateUrl()

                return res.redirect(url)
            }

            // get token
            await oauth2.setCredential(code)

            // get user data
            const { data } = await oauth2.getUserData()

            // user check
            const exist = await user_game.findOne({ where: { email: data.email } })

            if (!exist) {
                createUser = await user_game.create({
                    username: data.name,
                    email: data.email,
                    role: roles.user,
                    user_type: userEnum.google
                })
            }

            const reCheck = await user_game.findOne({ where: { email: data.email } })

            // generate token
            const payload = {
                id: reCheck.id,
                username: reCheck.username,
                email: reCheck.email,
                role: reCheck.role,
                user_type: reCheck.user_type
            }

            const token = jwt.sign(payload, JWT_SIGNATURE_KEY)

            const valid = jwt.verify(token, JWT_SIGNATURE_KEY)

            if (!valid) {
                return res.status(409).json({ status: false, message: 'you are not authorized!' })
            }

            return res.redirect('/')
        } catch (err) {
            next(err)
        }
    },

    registerPage: (req, res) => {
        res.render('register')
    },

    registerAdminPage: (req, res) => {
        res.render('register_admin')
    },

    regist: async (req, res, next) => {
        try {

            const {
                username, email, password, role = roles.user, user_type = userEnum.basic
            } = req.body

            const used = await user_game.findOne({ where: { email } })
            const oauth = await user_game.findOne({ where: { email, user_type: userEnum.google } })

            if (oauth) {
                return res.render('oauthReady')
            }

            if (used) {
                return res.render('register')
            }

            const encrypted = await bcrypt.hash(password, 10)

            const newUser = await user_game.create({
                username: username,
                email: email,
                password: encrypted,
                role: role
            })

            htmlEmail = await utils.getHtml('welcome.ejs', { username })

            await utils.sendMail(email, 'Welcome Message', htmlEmail)

            return res.redirect('/auth/login')
        } catch (err) {
            next(err)
        }
    },

    loginPage: (req, res) => {
        return res.render('login')
    },

    loginPageAdmin: (req, res) => {
        return res.render('login_admin')
    },

    login: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    }),

    whoami: (req, res, next) => {
        const user = req.user
        try {
            return res.status(200).json({
                status: true,
                message: "success",
                data: {
                    username: user.username,
                    email: user.email
                }
            })
        } catch (err) {
            next(err)
        }
    },

    forgotPage: (req, res) => {
        return res.render('forgot-password', { message: null })
    },

    forgotPass: async (req, res, next) => {
        try {
            const { email } = req.body

            const user = await user_game.findOne({ where: { email } })

            if (user) {
                const payload = { user_id: user.id }
                const token = jwt.sign(payload, JWT_SIGNATURE_KEY)
                const link = `http://localhost:3000/auth/reset-password?token=${token}`

                htmlEmail = await utils.getHtml('reset-password.ejs', { username: user.username, link: link })

                await utils.sendMail(user.email, 'Reset Password', htmlEmail)
            }

            return res.render('forgot-password', { message: 'link to reset your password was sended into your email!' })
        } catch (err) {
            next(err)
        }
    },

    resetPage: (req, res) => {
        const { token } = req.query

        return res.render('change-password', { message: null, token })
    },

    resetPass: async (req, res, next) => {
        try {
            const { token } = req.query

            const { new_password, confirm_new_password } = req.body

            if (!token) return res.render('change-password', { message: 'invalid token', token })

            if (new_password != confirm_new_password) return res.render('auth/reset-password', { message: 'confirmation password doesn\'t match!', token })

            const payload = jwt.verify(token, JWT_SIGNATURE_KEY)

            const encryptedPassword = await bcrypt.hash(new_password, 10)

            const user = await user_game.update({ password: encryptedPassword }, { where: { id: payload.user_id } })

            return res.render('login')
        } catch (err) {
            next(err)
        }
    }
}
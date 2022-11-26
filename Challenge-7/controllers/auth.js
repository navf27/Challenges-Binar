const { user_game } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SIGNATURE_KEY } = process.env
const roles = require('../utils/roles')
const passport = require('../utils/passport')
const oauth2 = require('../utils/google')
const userEnum = require('../utils/enum')

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

    // login: async (req, res, next) => {
    //     try {
    //         let { email, password } = req.body

    //         //username check
    //         let userMatch = await user_game.findOne({ where: { email } })

    //         if (!userMatch) {
    //             res.status(404).json({
    //                 status: false,
    //                 message: "username or password doesn\'t match"
    //             })
    //         }

    //         //compare
    //         let correct = await bcrypt.compare(password, userMatch.password)

    //         if (!correct) {
    //             res.status(400).json({
    //                 status: false,
    //                 message: "username or password doesn\'t match"
    //             })
    //         }

    //         payload = {
    //             id: userMatch.id,
    //             username: userMatch.username,
    //             email: userMatch.email
    //         }

    //         const token = jwt.sign(payload, JWT_SIGNATURE_KEY)

    //         return res.status(200).json({
    //             status: true,
    //             message: 'login success!',
    //             token: token
    //         })
    //     } catch (err) {
    //         next(err)
    //     }
    // },

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

    changePassword: async (req, res, next) => {
        try {
            const { oldPassword, newPassword, confirmNewPassword } = req.body

            if (newPassword !== confirmNewPassword) {
                return res.status(422).json({
                    status: false,
                    message: 'new password and confirm new password doesn\'t match!'
                })
            }

            const user = await user_game.findOne({ where: { id: req.user.id } })

            const correct = await bcrypt.compare(oldPassword, user.password)

            if (!correct) {
                return res.status(400).json({
                    status: false,
                    message: 'old password doesn\'t match!'
                })
            }

            const encryptedPassword = await bcrypt.hash(newPassword, 10)

            const updatedUser = await user_game.update({
                password: encryptedPassword
            }, {
                where: {
                    id: user.id
                }
            })

            return res.status(200).json({
                status: true,
                message: 'success change password!',
                data: {
                    username: user.username,
                    email: user.email
                }
            })
        } catch (err) {
            next(err)
        }
    }
}
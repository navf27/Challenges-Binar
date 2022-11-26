const { user_game } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SIGNATURE_KEY } = process.env

module.exports = {
    regist: async (req, res, next) => {
        try {
            const { username, email, password } = req.body

            const used = await user_game.findOne({ where: { email: email } })

            if (used) {
                return res.status(409).json({
                    status: false,
                    message: 'email already used!'
                })
            }

            const encrypted = await bcrypt.hash(password, 10)

            const newUser = await user_game.create({
                username,
                email,
                password: encrypted
            })

            return res.status(200).json({
                status: true,
                message: 'success',
                data: {
                    username: newUser.username,
                    email: newUser.email
                }
            })

        } catch (err) {
            next(err)
        }
    },

    login: async (req, res, next) => {
        try {
            let { email, password } = req.body

            //username check
            let userMatch = await user_game.findOne({ where: { email: email } })

            if (!userMatch) {
                res.status(404).json({
                    status: false,
                    message: "username or password doesn\'t match"
                })
            }

            //compare
            let correct = await bcrypt.compare(password, userMatch.password)

            if (!correct) {
                res.status(400).json({
                    status: false,
                    message: "username or password doesn\'t match"
                })
            }

            payload = {
                id: userMatch.id,
                username: userMatch.username,
                email: userMatch.email
            }

            const token = jwt.sign(payload, JWT_SIGNATURE_KEY)

            return res.status(200).json({
                status: true,
                message: 'login success!',
                token: token
            })
        } catch (err) {
            next(err)
        }
    },

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
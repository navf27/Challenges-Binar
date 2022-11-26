const { user_game } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {
    JWT_SIGNATURE_KEY
} = process.env

module.exports = {
    regist: async (req, res, next) => {
        try {
            const { username, password } = req.body

            const usedUsername = await user_game.findOne({ where: { username: username } })

            if (usedUsername) {
                return res.status(409).json({
                    status: false,
                    message: "username is already used!"
                })
            }

            const encrypted = await bcrypt.hash(password, 10)

            const newUser = await user_game.create({
                username,
                password: encrypted
            })

            return res.status(201).json({
                status: true,
                message: "success",
                data: {
                    username: newUser.name,
                    password: newUser.password
                }
            })

        } catch (err) {
            next(err)
        }
    },

    login: async (req, res, next) => {
        try {
            let { username, password } = req.body

            //username check
            let userMatch = await user_game.findOne({ where: { username: username } })

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
                username: userMatch.name,
                password: userMatch.password
            }
            const token = jwt.sign(payload, JWT_SIGNATURE_KEY)

            return res.status(200).json({
                status: true,
                username: userMatch.username,
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
                data: user,
            })
        } catch (err) {
            next(err)
        }
    },

    changePassword: async (req, res, next) => {
        try {
            const { username, oldPassword, newPassword, confirmNewPassword } = req.body;

            if (newPassword !== confirmNewPassword) {
                return res.status(422).json({
                    status: false,
                    message: 'new password and confirm new password doesn\'t match!'
                });
            }

            const userku = await user_game.findOne({ where: { username: username } });
            if (!userku) return res.status(404).json({ success: false, message: 'user not found!' });

            const correct = await bcrypt.compare(oldPassword, userku.password);
            if (!correct) {
                return res.status(400).json({
                    status: false,
                    message: 'old password does not match!'
                });
            }

            const encryptedPassword = await bcrypt.hash(newPassword, 10);
            const updatedUser = await user_game.update({
                password: encryptedPassword
            }, {
                where: {
                    id: userku.id
                }
            });

            return res.status(200).json({
                status: true,
                message: 'success',
                data: {
                    "id": userku.id,
                    "username": userku.username
                }
            });

        } catch (err) {
            next(err);
        }
    }
}
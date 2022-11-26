const { user_game } = require('../models')
const bcrypt = require('bcrypt')

module.exports = {
    index: async (req, res, next) => {
        try {
            const user = await user_game.findAll()

            res.status(200).json({
                status: true,
                message: 'success',
                data: user
            })
        } catch (err) {
            next(err)
        }
    },

    delete: async (req, res, next) => {
        try {
            const { username, password } = req.body

            let user = await user_game.findOne({ where: { username: username } })
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "username or password doesn\'t match!",
                    data: null
                })
            }

            let correct = await bcrypt.compare(password, user.password)
            if (!correct) {
                return res.status(400).json({
                    status: false,
                    message: "username or password doesn\'t match!"
                })
            }

            const deleted = await user_game.destroy({ where: { username: username } })

            return res.status(200).json({
                status: true,
                message: "success delete user!",
                data: {
                    "id": user.id,
                    "username": user.username
                }
            })
        } catch (err) {
            next(err)
        }
    }
}
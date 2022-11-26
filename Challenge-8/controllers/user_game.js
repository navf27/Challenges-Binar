const { user_game } = require('../models')
const bcrypt = require('bcrypt')

module.exports = {
    index: async (req, res, next) => {
        try {
            const user = await user_game.findAll()

            return res.status(200).json({
                status: true,
                message: 'success get all data of user!',
                data: user
            })
        } catch (err) {
            next(err)
        }
    },

    delete: async (req, res, next) => {
        try {
            const { email, password } = req.body

            let user = await user_game.findOne({ where: { email: email } })

            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "email or password doesn\'t match!"
                })
            }

            let correct = await bcrypt.compare(password, user.password)

            if (!correct) {
                return res.status(400).json({
                    status: false,
                    message: "email or password doesn\'t match!"
                })
            }


            const deleted = await user_game.destroy({ where: { email: email } })

            return res.status(200).json({
                status: true,
                message: "success delete user!",
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
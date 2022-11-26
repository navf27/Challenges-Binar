const { user_game_history } = require('../models')

module.exports = {
    create: async (req, res, next) => {
        try {
            const { highest_tier, highest_points } = req.body

            const dataExist = await user_game_history.findOne({ where: { highest_tier } })
            if (dataExist) {
                return res.status(409).json({
                    status: false,
                    message: "data already exist!",
                    data: null
                })
            }

            const created = await user_game_history.create({ highest_tier, highest_points })

            return res.status(200).json({
                status: true,
                message: "data created!",
                data: { highest_tier, highest_points }
            })
        } catch (err) {
            next(err)
        }
    },

    index: async (req, res, next) => {
        try {
            const data = await user_game_history.findAll()
            return res.status(200).json({
                status: true,
                message: "success get all data!",
                data: data
            })
        } catch (err) {
            next(err)
        }
    },

    update: async (req, res, next) => {
        try {
            const { id, highest_tier, highest_points } = req.body

            const data = await user_game_history.findOne({ where: { id: id } })

            const update = await user_game_history.findOne({ where: { id, highest_tier, highest_points } })

            if (!data) {
                return res.status(404).json({
                    status: false,
                    message: "data not found!",
                    data: null
                })
            } else if (update) {
                return res.status(409).json({
                    status: false,
                    message: "data already updated!",
                    data: null
                })
            }

            const updated = await user_game_history.update({
                highest_tier, highest_points
            }, {
                where: { id }
            })

            return res.status(200).json({
                status: true,
                message: "data updated!",
                data: { highest_tier, highest_points }
            })
        } catch (err) {
            next(err)
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params

            const deleted = await user_game_history.destroy({ where: { id } })
            if (!deleted) {
                return res.status(404).json({
                    status: false,
                    message: "data not found!",
                    data: null
                })
            }

            return res.status(200).json({
                status: true,
                message: "data deleted!",
                data: deleted
            })
        } catch (err) {
            next(err)
        }
    }
}
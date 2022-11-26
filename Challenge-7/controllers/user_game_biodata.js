const { user_game_biodata } = require('../models')

module.exports = {
    create: async (req, res, next) => {
        try {
            const { account_name, account_level } = req.body

            const dataExist = await user_game_biodata.findOne({ where: { account_name: account_name } })
            if (dataExist) {
                return res.status(409).json({
                    status: false,
                    message: "data already exist!",
                    data: null
                })
            }

            const insertData = await user_game_biodata.create({ account_name, account_level })

            return res.status(200).json({
                status: true,
                message: "create data success!",
                data: { account_name, account_level }
            })
        } catch (err) {
            next(err)
        }
    },

    index: async (req, res, next) => {
        try {
            const data = await user_game_biodata.findAll()

            return res.status(200).json({
                status: true,
                message: 'success get all data!',
                data: data
            })
        } catch (err) {
            next(err)
        }
    },

    update: async (req, res, next) => {
        try {
            const { account_name, account_level } = req.body

            const data = await user_game_biodata.findOne({ where: { account_name: account_name } })
            const dataUpdate = await user_game_biodata.findOne({
                where: {
                    account_name: account_name,
                    account_level: account_level
                }
            })

            if (!data) {
                return res.status(404).json({
                    status: false,
                    message: "data not found!",
                    data: null
                })
            } else if (dataUpdate) {
                return res.status(409).json({
                    status: false,
                    message: "data already update!",
                    data: null
                })
            }

            const updated = await user_game_biodata.update({
                account_name: account_name,
                account_level: account_level
            }, {
                where: { account_name: account_name }
            })

            return res.status(200).json({
                status: true,
                message: 'update success!',
                data: {
                    account_name: account_name,
                    account_level: account_level
                }
            })
        } catch (err) {
            next(err)
        }
    },

    delete: async (req, res, next) => {
        try {
            const { account_name } = req.body

            const data = await user_game_biodata.findOne({ where: { account_name: account_name } })

            if (!data) {
                return res.status(404).json({
                    status: false,
                    message: "data not found!",
                    data: null
                })
            }

            const deleted = await user_game_biodata.destroy({ where: { account_name: account_name } })

            return res.status(200).json({
                status: true,
                message: "success delete data!",
                data: { account_name: data.account_name, account_level: data.account_level }
            })
        } catch (err) {
            next(err)
        }
    }
}

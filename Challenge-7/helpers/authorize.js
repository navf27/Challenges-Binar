const jwt = require('jsonwebtoken')
const { JWT_SIGNATURE_KEY } = process.env
const { user_game } = require('../models')
const bcrypt = require('bcrypt')

module.exports = (roles = []) => {
    if (roles === 'string') {
        roles = [roles]
    }

    return async (req, res, next) => {
        // const getUser = await user_game.authenticate(req.body)

        // const accessToken = getUser.generateToken()

        // const payload = jwt.verify(accessToken, JWT_SIGNATURE_KEY)

        // console.log(payload.role)

        const { email, password } = req.body

        const exist = await user_game.findOne({ where: { email } })

        if (!exist) {
            return res.render('login_admin')
        }

        const valid = await bcrypt.compare(password, exist.password)

        if (!valid) {
            return res.render('login_admin')
        }

        if (roles.length > 0 && !roles.includes(exist.role)) {
            return res.json({ exist })
        }

        next()
    }
}
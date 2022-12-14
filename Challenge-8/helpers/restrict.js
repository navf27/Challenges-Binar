const passport = require('../utils/passport')

module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    }

    return res.redirect('/auth/login')
}


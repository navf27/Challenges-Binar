const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const { user_game } = require('../models')
const bcrypt = require('bcrypt')

async function authentication(email, password, done) {
    try {
        const user = await user_game.findOne({ where: { email } })

        if (!user) {
            return done(null, false, { message: 'user not found!' })
        }

        const valid = await bcrypt.compare(password, user.password)

        if (!valid) {
            return done(null, false, { message: 'email and password did not match!' })
        }

        return done(null, user)

    } catch (err) {
        return done(null, false, { message: err.message })
    }
}

passport.use(new localStrategy({ usernameField: 'email', passwordField: 'password' }, authentication))

// create session
passport.serializeUser((user, done) => {
    return done(null, user.id)
})

// delete session
passport.deserializeUser(async (id, done) => {
    return done(null, await user_game.findOne({ where: { id: id } }))
})

module.exports = passport
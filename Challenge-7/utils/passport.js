const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { user_game } = require('../models')
const bcrypt = require('bcrypt')

async function authenticate(email, password, done) {
    try {
        const user = await user_game.findOne({ where: { email } })
        if (!user) {
            // balikan error
            return done(null, false, { message: 'user not found!' })
        }

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
            // balikan error
            return done(null, false, { message: 'invalid password' })
        }

        return done(null, user)
    } catch (err) {
        return done(null, false, { message: err.message })
    }
}

passport.use(new LocalStrategy({ usernameField: 'email', paswordField: 'password' }, authenticate))

// serialize -> menyimpan sesi
passport.serializeUser((user, done) => {
    return done(null, user.id)
})

// serialize -> membaca sesi
passport.deserializeUser(async (id, done) => {
    return done(null, await user_game.findOne({ where: { id } }))
})

module.exports = passport

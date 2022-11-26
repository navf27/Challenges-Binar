require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const router = require('./routes')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('./utils/passport')

const {
    HTTP_PORT = 3000
} = process.env

app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(session({
    secret: process.env.JWT_SIGNATURE_KEY,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
app.use(router)
app.use('/audio', express.static('aud'))

//404 handler//
app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        message: '404 not found!'
    })
})

//500 handler//
app.use((err, req, res, next) => {
    res.status(500).json({
        status: false,
        message: err.message
    })
})

app.listen(HTTP_PORT, () => { console.log('listening on port :', HTTP_PORT) })

module.exports = app


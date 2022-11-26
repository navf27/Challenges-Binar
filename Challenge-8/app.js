require('dotenv').config()
const {
    HTTP_PORT = 3000,
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY,
    VAPID_SUBJECT
} = process.env

const express = require('express')
const app = express()
const morgan = require('morgan')
const router = require('./routes')
const session = require('express-session')
const flash = require('express-flash')
const cors = require('cors')
const webPush = require('web-push')
const path = require('path')
const methodOverride = require('method-override')

app.use(cors())
app.use(express.json())
webPush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY)
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(session({
    secret: process.env.JWT_SIGNATURE_KEY,
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(router)
// app.use('/video', express.static('public/videos'))
app.use('/auth', express.static('client'))
app.use('/client', express.static('client'))

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


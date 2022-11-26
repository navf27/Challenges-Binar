require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const router = require('./routes')

const {
    HTTP_PORT = 3000
} = process.env

app.use(express.json())
app.use(morgan('dev'))
app.use(router)

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

// app.listen(HTTP_PORT, () => { console.log('listening on port :', HTTP_PORT) })

module.exports = app


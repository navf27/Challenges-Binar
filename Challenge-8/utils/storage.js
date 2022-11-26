const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/videos')
    },

    filename: (req, file, callback) => {
        const namaFile = Date.now() + path.extname(file.originalname)
        callback(null, namaFile)
    }
})

const upload = multer({
    storage: storage,

    fileFilter: (req, file, callback) => {
        if (file.mimetype == 'video/mp4' || file.mimetype == 'video/mpv' || file.mimetype == 'video/x-msvideo') {
            callback(null, true)
        } else {
            const err = new Error('only mp4, mpv and x-msvideo format are supported!')
            callback(err, false)
        }
    },

    //err handling
    onError: (err, next) => {
        next(err)
    }
})


module.exports = upload


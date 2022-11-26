const express = require('express')
const router = express.Router()
const control = require('../controllers')
const authorize = require('../helpers/authorize')
const role = require('../utils/roles')
const storage = require('../utils/storage')
const webPush = require('web-push')
const cors = require('cors')
const app = express()

const VAPID_PUBLIC_KEY = 'BI87GsEtUQQ82gv2HbVMmpi1baAXbjI-T-wbX0i8jw7hGNY1KB1DdPkekytwBdWY4ear-TqGzMl97mtjWwh9kJ0'
const VAPID_PRIVATE_KEY = '2GeK_PW0pGl6Td-qCBdJ7aOLpP1t88os-LxSdoticxs'
const VAPID_SUBJECT = 'mailto:muhnaufalaji@gmail.com'

app.use(cors())
webPush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY)

// video post
router.post('/upload/video', storage.single('media'), (req, res) => {
    const vidUrl = req.protocol + '://' + req.get('host') + '/video/' + req.file.filename
    return res.json({ vidUrl })
})

// google oauth
router.get('/api/auth/login', control.auth.google)

// home
router.get('/', (req, res) => {
    return res.render('home', { status: 'not paid yet' })
})
router.post('/', (req, res) => {
    const { nominal } = req.body
    return res.render('home', { status: `Rp.${nominal} has been paid!` })
})

// register
router.get('/auth/register', control.auth.registerPage)
router.post('/auth/register', control.auth.regist)
router.get('/auth/register-admin', control.auth.registerAdminPage)
router.post('/auth/register-admin', control.auth.regist)

// notification url
router.post('/notif-subscribe', async (req, res) => {
    try {
        const subscription = req.body

        const payload = JSON.stringify({
            title: 'new notification!',
            body: 'register success'
        })

        webPush.sendNotification(subscription, payload)
            .then(result => console.log(result))
            .catch(e => console.log(e.stack))

        // res.status(200).json({ 'success': true });

    } catch (err) {
        console.log(err)
        // return res.status(500).json({
        //     status: false,
        //     message: err.message
        // })
    }
})

// login
router.get('/auth/login', control.auth.loginPage)
router.post('/auth/login', control.auth.login)
router.get('/auth/login-admin', control.auth.loginPageAdmin)
router.post('/auth/login-admin', authorize(role.admin), control.auth.login)

// forgot password
router.get('/auth/forgot-password', control.auth.forgotPage)
router.post('/auth/forgot-password', control.auth.forgotPass)

// reset password
router.get('/auth/reset-password', control.auth.resetPage)
router.post('/auth/reset-password', control.auth.resetPass)

router.use('/auth/whoami', control.auth.whoami)
// router.use('/auth/change', control.auth.changePassword)
router.use('/user/index', control.user_game.index)
router.use('/user/delete', control.user_game.delete)
router.use('/user-bio/create', control.user_game_biodata.create)
router.use('/user-bio/index', control.user_game_biodata.index)
router.use('/user-bio/update', control.user_game_biodata.update)
router.use('/user-bio/delete', control.user_game_biodata.delete)
router.use('/user-history/create', control.user_game_history.create)
router.use('/user-history/index', control.user_game_history.index)
router.use('/user-history/update', control.user_game_history.update)
router.use('/user-history/delete', control.user_game_history.delete)

module.exports = router
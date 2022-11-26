const express = require('express')
const router = express.Router()
const control = require('../controllers')
const authorize = require('../helpers/authorize')
const role = require('../utils/roles')
const restrict = require('../helpers/restrict')

// google oauth
router.get('/api/auth/login', control.auth.google)

// home
router.get('/', (req, res) => {
    // console.log(req.getUser, req.user)
    return res.render('home', restrict, { user: req.user })
})

//

// register
router.get('/auth/register', control.auth.registerPage)
router.post('/auth/register', control.auth.regist)
router.get('/auth/register-admin', control.auth.registerAdminPage)
router.post('/auth/register-admin', control.auth.regist)

// login
router.get('/auth/login', control.auth.loginPage)
router.post('/auth/login', control.auth.login)
router.get('/auth/login-admin', control.auth.loginPageAdmin)
router.post('/auth/login-admin', authorize(role.admin), control.auth.login)

router.use('/auth/whoami', control.auth.whoami)
router.use('/auth/change', control.auth.changePassword)
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

const router = require('express').Router()
// const bcrypt = require('bcrypt')
// const pool = require('../db')
const validInfo = require('../middleware/validInfo')
// const jwtGenerator = require('../utils/jwtGenerator')
const authorize = require('../middleware/authorise')
const controller = require('../controllers/auth')

router.post('/register', validInfo, controller.register)
router.post('/sendSms', controller.sendSms)
router.post('/login', validInfo, controller.login)
router.post('/forgotPassword',validInfo,controller.forgotPassword)
router.post('/resetPassword',validInfo,controller.resetPassword)
router.post('/verify', authorize, controller.verify)

module.exports = router
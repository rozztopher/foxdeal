
const router = require('express').Router()
const authorize = require('../middleware/authorise')
const controller = require('../controllers/dashboard')
const userController = require('../controllers/user')

router.post('/', authorize, userController.get)

module.exports = router
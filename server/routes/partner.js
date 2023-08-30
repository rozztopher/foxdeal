
const router = require('express').Router()
const authorize = require('../middleware/authorise')
const controller = require('../controllers/partners');

router.get('/', controller.all);

router.get('/:id', controller.get)

router.get('/selected', authorize, controller.completeTask)

module.exports = router
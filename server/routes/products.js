const router = require('express').Router()
const controller = require('../controllers/products');

router.get('/', controller.all);

router.get('/:id', controller.get)

module.exports = router
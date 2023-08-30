
const router = require('express').Router()
const authorize = require('../middleware/authorise')
const controller = require('../controllers/user');
const validInfo = require('../middleware/validInfo')
router.put('/',authorize,validInfo, controller.update);

router.post('/credits', authorize, controller.updateCredits)

router.get('/', authorize, controller.get)

router.delete('/', authorize,controller.delete)
router.post('/completedTasks', authorize,controller.updateCompletedTask)
router.get('/completedTasks', authorize,controller.completedTasks)
router.post('/checkout', authorize,controller.checkout)

module.exports = router
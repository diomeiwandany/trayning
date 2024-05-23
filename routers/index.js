const Controller = require('../controllers/controller');

const router = require('express').Router();

router.get('/', Controller.home);
router.get('/register', Controller.register)
router.post('/register/add', Controller.postRegister)

module.exports = router;
var express = require('express');
var router = express.Router();

var homeController = require('../controllers/home_controller')
const UserController = require('../controllers/user_controller');

/* GET home page. */
router.get('/', homeController.homePage);

router.post('/signup', UserController.signup)

router.post('/login', UserController.login);

module.exports = router;

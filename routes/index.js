var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home_controller')

/* GET home page. */
router.get('/', homeController.homePage);

module.exports = router;

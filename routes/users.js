var express = require('express');
var router = express.Router();

const UserController = require('../controllers/user_Controller');

//router.post('signup', UserController.signup)

//router.post('/login', UserController.login);

router.get('/user/:userId', UserController.allowIfLoggedin, UserController.getUser);
 
router.get('/users', UserController.allowIfLoggedin, UserController.grantAccess('readAny', 'profile'), UserController.getUsers);
 
router.put('/user/:userId', UserController.allowIfLoggedin, UserController.grantAccess('updateAny', 'profile'), UserController.updateUser);
 
router.delete('/user/:userId', UserController.allowIfLoggedin, UserController.grantAccess('deleteAny', 'profile'), UserController.deleteUser);

/* GET users listing. */
//router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
//});

module.exports = router;

var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
secret: process.env.JWT_SECRET,
algorithms: ["HS256"]
});

const UserController = require('../controllers/user_controller');

//router.post('signup', UserController.signup)

//router.post('/login', UserController.login);

router.get('/user/:userId', auth, UserController.getUser);
 
router.get('/users', auth, UserController.grantAccess('readAny', 'profile'), UserController.getUsers);
 
router.put('/user/:userId', auth, UserController.grantAccess('updateAny', 'profile'), UserController.updateUser);
 
router.delete('/user/:userId', auth, UserController.grantAccess('deleteAny', 'profile'), UserController.deleteUser);

/* GET users listing. */
//router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
//});

module.exports = router;

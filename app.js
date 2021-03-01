require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var path = require('path')
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const User = require('./models/user')

// require("dotenv").config({
//   path: path.join(__dirname, "../.env")
//  });

require('./models/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hotelRouter = require('./routes/hotel')

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//Setting up middleware to save login information to later check if user is logged
// app.use(async (req, res, next) => {
//  if (req.headers["x-access-token"]) {
//   const accessToken = req.headers["x-access-token"];
//   const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
//   // Check if token has expired
//   if (exp < Date.now().valueOf() / 1000) { 
//    return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
//   } 
//   res.locals.loggedInUser = await User.findById(userId); next(); 
//  } else { 
//   next(); 
//  } 
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hotel', hotelRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

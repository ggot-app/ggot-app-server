/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('dotenv').config();
require('./config/db');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors());

const logger = require('morgan');

const userRouter = require('./routes/user');
const usersRouter = require('./routes/users');
const photosRouter = require('./routes/photos');

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static(__dirname + '/public'));

app.use('/user', userRouter);
app.use('/users', usersRouter);
app.use('/photos', photosRouter);

app.use(function(req, res, next) {
  const error = new Error('Not Found');
  error.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.errorMessage = err.message || 'Internal Server Error';
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

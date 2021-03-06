var createError = require('http-errors');
var express = require('express');
var mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var keyValueRouter = require('./routes/keyValueRoute');

// Database init 
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV == "production") {
  mongoose.connect("mongodb://database:9001/interview_db")
} else {
  mongoose.connect("mongodb://127.0.0.1:4001/interview_db")
}

var app = express();
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/values', keyValueRouter);


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
  res.status(err.status || 500).json({
    status : false ,
    message : res.locals.message
  });
});

module.exports = app;

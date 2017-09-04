const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

//API endpoints handlers
const libraryApiHandler = require('./routes/libraryApiHandler');

let app = express();

//MongoDB database setup
//Set up mongoose connection
let mongoose = require('mongoose');
let mongoDBurl = 'mongodb://mayales:music123@ds119014.mlab.com:19014/music-app-library';
mongoose.connect(mongoDBurl);
let mongoDatabase = mongoose.connection;
mongoDatabase.on('error', console.error.bind(console, 'MongoDB connection error:'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

//Mount specific API routes to matching handlers
app.use('/api', libraryApiHandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.send('error' + err);
});

module.exports = app;

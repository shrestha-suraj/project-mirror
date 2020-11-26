var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var playRouter = require('./routes/play.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// This route checks if the REST API is working
app.use('/', indexRouter);

// This route takes in query and plays audio with given string
app.use('/play', playRouter);

module.exports = app;

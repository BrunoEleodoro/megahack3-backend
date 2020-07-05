var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var express_oas_generator = require('express-oas-generator');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
var activitiesRouter = require('./routes/activities');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/activities', activitiesRouter);

express_oas_generator.init(app, {})
module.exports = app;

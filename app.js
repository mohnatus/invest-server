var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var portfolioRouter = require('./routes/portfolio');
var compositionRouter = require('./routes/composition');
var balanceRouter = require('./routes/balance');
var buyRouter = require('./routes/buy');
var etfsRouter = require('./routes/etfs');
var tinkoffEtfsRouter = require('./routes/tinkoff-etfs');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/portfolio', portfolioRouter);
app.use('/composition', compositionRouter);
app.use('/balance', balanceRouter);
app.use('/buy', buyRouter);
app.use('/etfs', etfsRouter);
app.use('/tinkoff-etfs', tinkoffEtfsRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

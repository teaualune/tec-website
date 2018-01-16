var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var less = require('less-middleware');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); 
var _ = require('lodash');
var helmet = require('helmet');
var classnames = require('classnames');

require('dotenv').load();

var config = require('./config');
var mountKeystone = require('./content');

var app = express();

var isProduction = process.env.NODE_ENV === 'production';

app.use(cookieParser(config.cookieSecret));

app.use(helmet.xframe());
app.use(helmet.xssFilter());
app.use(helmet.nosniff());
app.use(helmet.ienoopen());
app.disable('x-powered-by');

mountKeystone(app, function () {

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
  app.use(logger(isProduction ? 'combined' : 'dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(less(path.join(__dirname, 'public'), {
    once: isProduction,
    force: !isProduction
  }));

  app.use(express.static(path.join(__dirname, 'public')));

  app.use(function (req, res, next) {
    _.merge(res.locals, config);
    res.locals.isProduction = isProduction;
    res.locals.meta.url = req.protocol + '://' + req.hostname + req.originalUrl;
    res.locals.classnames = classnames;
    res.locals.active = _.findIndex(config.menu[0], function (menu) {
      return req.originalUrl.indexOf(menu.href) === 0;
    });
    next();
  });

  app.use(require('./routes'));

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  if (isProduction) {
    // production error handler
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });
  } else {
    // development error handler
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

});

module.exports = app;

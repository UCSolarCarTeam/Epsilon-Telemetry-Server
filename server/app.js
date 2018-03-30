const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');

// Get API routes
const api = require('./routes/api');

const app = express();

// Used to parse POST data from Angular app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../web-app/dist')));

/**
 * Routes
 */
// API Route
app.use('/api', api);

// Main page
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../web-app/dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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

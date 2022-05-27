const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();
const db = require('./scripts/database');
const cors = require('cors');
const { config } = require('bluebird');

// Used to parse POST data from Angular app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors( { origin: 'http://localhost:4200' } ));
app.use(logger('combined'));
//app.use(express.static(path.join(__dirname, '../web-app/dist')));

/**
 * Routes
 */

app.get('/', (req, res) => res.send(''))

app.use('/api/test', (req, res) => {
  res.send( {
    test: 'test call works!'
  });
});

app.use('/api/getPackets', (req, res) => {
  // API code will be here
  // 1651354920000, 1651354930000
  db.between(Number(req.query.startTime), Number(req.query.endTime)).then(function(result) {
    res.send(result)
  }).catch((err) => {
    console.log(err);
    res.send('error')
  })
});

app.use('/api/lastPacket', (req, res) => {
  // API code will be here
  db.lastPacket().then(function(result) {
    res.send(result[0])
  }).catch((err) => {
    console.log(err);
    res.send('error')
  })
});

// catch 404 and forward to error handle
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

app.listen(config.server.port, function() {
  console.log('Express server listening on port 3000');
  });

module.exports = app;

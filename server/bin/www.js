#!/usr/bin/env node
'use strict';

const debug = require('debug');
const http = require('http');
const app = require('../app');
const config = require('../config');

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || config.server.port;
app.set('port', port);

/**
 * Create HTTP server and setup websocket
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', function(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

/**
 * Event listener for HTTP server "listening" event.
 */
server.on('listening', function() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  const mode = app.get('env');
  debug('Listening on ' + bind + ' in ' + mode + ' mode');
});

module.exports.server = server;

/**
 * Startup scripts
 */
 var db = require('../scripts/database');
 db.connectToDatabase()
   .then(() => {
    console.log('connected to mongo database');
    require('../scripts/websocket');
    if(config.isProd)
      require('../scripts/amqp');
 });

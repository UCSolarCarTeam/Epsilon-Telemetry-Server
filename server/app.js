/**
 * Module dependencies.
 */
const amqp = require('amqplib');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const cors = require('cors');

/**
 * Constants
 */
const amqpQueueName = 'telem';

/**
 * Controllers (route handlers).
 */
// TODO

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 4000);
app.use(
  cors({
    exposedHeaders: ['Link'],
  })
);
app.use(expressStatusMonitor());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

// Consumer
amqp
  .connect('amqp://localhost')
  .then(function(conn) {
    process.once('SIGINT', function() {
      conn.close();
    });
    return conn.createChannel().then((ch) => {
        ch.assertQueue(amqpQueueName, {exclusive: true})
        .then(() => {
          return ch.consume(
            amqpQueueName,
            (message) => {
               // TODO: Set content directly into database
              console.log(' [x] Received \'%s\'', message.content.toString());
            },
            {noAck: false}
          );
        })
        .then(() => console.log(' [*] Waiting for logs. To exit press CTRL+C'));
    });
  })
  .catch(console.warn);

/**
 * Primary app routes.
 */
// TODO

/**
 * Static serving for images
 */
app.use('/img', express.static(__dirname + '/assets'));

/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(
    '%s Express server listening on port %d in %s mode.',
    chalk.green('✓'),
    app.get('port'),
    app.get('env')
  );
});

module.exports = app;

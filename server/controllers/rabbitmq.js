const Telemetry = require('../models/telemetry');

// Constants
const amqpQueueName = 'telem';

const translatePayload = function(payload) {
  console.log(' [x] Received \'%s\'', payload.toString());
  return {};
};

const writeIncomingTelemetryToDatabase = function(message) {
  new Telemetry(translatePayload(message.content)).save().then((saved) => {
    console.log(`Telemetry data saved`);
  });
};

const connectRabbitMq = function() {
  require('amqplib')
    .connect('amqp://localhost')
    .then(function(conn) {
      process.once('SIGINT', function() {
        conn.close();
      });
      return conn.createChannel().then((ch) => {
        ch
          .assertQueue(amqpQueueName, {exclusive: true})
          .then(() => {
            return ch.consume(amqpQueueName, writeIncomingTelemetryToDatabase, {
              noAck: false,
            });
          })
          .then(() =>
            console.log(' [*] Waiting for logs. To exit press CTRL+C')
          );
      });
    })
    .catch(console.warn);
};

module.exports = connectRabbitMq;

const amqp = require('amqplib');
const config = require('../config');
const db = require('./database');
const wss = require('./websocket').websocket;
const rc = require('./race');

let volumeDown = false;
let lastTimestamp;

db.lastLap()
  .then((lastLap) => {
    lastTimestamp = lastLap.timestamp;
}).catch(() => {
    lastTimestamp = '-infinity';
});

/**
 * Setup the AMQP channel with RabbitMQ
 */
amqp.connect(config.rabbitmq.host)
  // connect with amqp server
  .then((conn) => {
    return conn.createChannel();
  })
  // check if exchange exists and is valid
  .then((ch) => {
    const ex = config.rabbitmq.exchange_name;
    const q = config.rabbitmq.queue_name;
    ch.assertExchange(ex, 'fanout', {durable: false});
    ch.assertQueue(q, {durable: false});

    // bind internal queue with external exchange and enter ready state
    return ch.bindQueue(q.queue, ex, '')
      .then((ok) => {
        console.log(`Express: waiting for messages in ${q}`);

        // start reading objects from the queue
        return ch.consume(q, function(msg) {
          const jsonObj = JSON.parse(msg.content);
          // save the data into database
          // Process Lap data
          // Want to capture when button is released
          // TODO: Swap VolumeDown with lap button when it's ready
          if (!jsonObj.DriverControls.VolumeDown
            && volumeDown) {
            db.between(lastTimestamp, jsonObj.TimeStamp)
               .then((allPackets) => {
                 let averagePackCurrent = rc.getAveragePackCurrent(allPackets);
                 lastTimestamp = jsonObj.TimeStamp;
                 // Create Lap JSON Object
                 let lap = {'averagePackCurrent': averagePackCurrent};
                 db.addLap(lap)
                   .then((insertedRow) => {
                     console.log('1 row inserted into Lap Table');
                     insertedRow['msgType'] = 'lap';
                     wss.broadcast(JSON.stringify(insertedRow));
                   });
               });
          }
          volumeDown = jsonObj.DriverControls.VolumeDown;

          // Process Packet Data
          db.insert('rabbitmq-insert', jsonObj)
            .then((insertedRow) => {
              console.log('1 row inserted from RabbitMQ');
              insertedRow['msgType'] = 'packet';
              // send to angular clients
              wss.broadcast(JSON.stringify(insertedRow));
            });
        }, {noAck: true});
      });
  })
  // catch RabbitMQ queue creation errors
  .catch(function(e) {
    console.error(`ERROR: Cannot create channel. Are you sure RabbitMQ is online at ${config.rabbitmq.host}?`);
    process.exit(1);
  });

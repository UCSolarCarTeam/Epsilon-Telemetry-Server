const amqp = require('amqplib');
const app = require('../app');
const config = require('../config');
const db = require('./database');
const wss = require('./websocket').websocket;
const rc = require('./race');

let lap = false;
let lastLapTimestamp = undefined;

db.lastLap()
  .then((lastLap) => {
    if(lastLap[0] != null)
      lastLapTimestamp = lastLap[0].timestamp;
}).catch(() => {
    lastLapTimestamp = undefined;
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
          // Process Packet Data
          if(jsonObj.Ccs.CcsAlive === true){
            try {
              db.insert('rabbitmq-insert', jsonObj)
              .then(() => {
                wss.broadcast(JSON.stringify(jsonObj));
              });
            }
            catch {
              console.error('Could not insert packet into database')
              wss.broadcast(JSON.stringify(jsonObj));
            }
          }
          else {
            wss.broadcast(JSON.stringify(jsonObj));
          }
          
          // Process Lap data
          // Want to capture when button is released
          if (!jsonObj.DriverControls.Lap
            && lap) {
            const currentTimeStampEpoch = jsonObj.TimeStamp;
            db.betweenLap(lastLapTimestamp, currentTimeStampEpoch)
               .then((allPackets) => {
                  let timestamp = currentTimeStampEpoch;
                  let averagePowerIn = rc.getAveragePowerIn(allPackets);
                  let averagePowerOut = rc.getAveragePowerOut(allPackets);
                  let averagePackCurrent = rc.getAveragePackCurrent(allPackets);
                  let amphours = jsonObj.Battery.PackAmphours;

                  // Create Lap JSON Object
                  let lap = {
                    'timestamp': timestamp,
                    'secondsdifference': timestamp - (lastLapTimestamp != undefined ? lastLapTimestamp : timestamp),
                    'totalpowerin': averagePowerIn,
                    'totalpowerout': averagePowerOut,
                    'netpowerout': averagePowerOut - averagePowerIn,
                    'distance': rc.getDistanceTraveled(allPackets),
                    'amphours': amphours,
                    'averagepackCurrent': averagePackCurrent,
                    'batterysecondsremaining': rc.getSecondsRemainingUntilChargedOrDepleted(averagePackCurrent, amphours),
                    'averagespeed': rc.getAverageSpeed(allPackets),
                    'msgType': 'lap'
                  };
                  db.addLap(lap)
                    .then(() => {
                      wss.broadcast(JSON.stringify(lap));
                    });
                  lastLapTimestamp = currentTimeStampEpoch;
               });
          }

          lap = jsonObj.DriverControls.Lap;
        }, {noAck: true});
      });
  })
  // catch RabbitMQ queue creation errors
  .catch(function(e) {
    console.error(`ERROR: Cannot create channel. Are you sure RabbitMQ is online at ${config.rabbitmq.host}?`);
    process.exit(1);
  });

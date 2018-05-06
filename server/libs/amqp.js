const amqp = require('amqplib');
const BSON = require('bson');
const promise = require('promise');
const config = require('../config.json');
const db = require('./database').db;
const mapJsonToColumns = require('./database').mapColumns;
const wss = require('./websocket').websocket
const bson = require('./websocket').bson;

/**
 * Get column names and store in global variable.
 */
console.log('Updating column names...');
let columnNames = '';
db.any({
  name: 'update-columns',
  text: 'SELECT column_name FROM information_schema.columns ' +
        'WHERE table_schema = \'public\' AND table_name = \'packet\''
}).then(columns => {
  columnNames = columns.slice(1).map(column => column.column_name).join();
  console.log('Column names updated');
});

/**
 * Setup the AMQP channel with RabbitMQ
 */
amqp.connect(config.rabbitmq.host)
  // connect with amqp server
  .then(conn => {
    return conn.createChannel();
  })
  // check if exchange exists and is valid
  .then(ch => {
    const ex = config.rabbitmq.exchange_name;
    const q = config.rabbitmq.queue_name;
    ch.assertExchange(ex, 'fanout', {durable: false});
    ch.assertQueue(q, {durable: false});

    // bind internal queue with external exchange and enter ready state
    return ch.bindQueue(q.queue, ex, '')
      .then(ok => {
        console.log(`Express: waiting for messages in ${q}`);

        // start reading objects from the queue
        return ch.consume(q, function(msg) {
          const jsonObj = JSON.parse(msg.content);

          // insert into database
          db.one({
            name: 'rabbitmq-insert',
            text: `INSERT INTO packet(${columnNames}) values(${mapJsonToColumns(jsonObj)}) RETURNING row_to_json(packet)`
          }).then(inserted_row => {
            console.log('1 row inserted from RabbitMQ');

            // serialize the data and broadcast it to all connected clients
            serializedData = bson.serialize(inserted_row.row_to_json);
            wss.broadcast = function broadcast(serializedData) {
              wss.clients.map(client => client.send(serializedData));
            };
          });
        }, {noAck: true});
      });
  })
  // catch RabbitMQ queue creation errors
  .catch(function(e) {
    console.error(`ERROR: Cannot create channel. Are you sure RabbitMQ is online at ${config.rabbitmq.host}?`);
    process.exit(1);
  });
const amqp = require('amqplib');
const BSON = require('bson');
const promise = require('promise');
const db = require('./database');
const wss = require('./websocket').websocket
const config = require('../config.json');
const bson = new BSON();

/**
 * Get column names and store in global variable.
 */
console.log('Updating column names...');
let columnNames = '';
db.pool.connect(function(err, client, done) {
  if (err) {
    return console.error(db.errors.CONNECT_ERROR, err.stack);
  }
  const query = 'SELECT column_name FROM information_schema.columns ' +
                'WHERE table_schema = \'public\' AND table_name = \'packet\'';
  client.query(query, function(err, result) {
    done();
    if (err) {
      return console.error(db.errors.SELECT_ERROR, err.stack);
    }

    // build column name list and remove trailing comma and whitespace
    for (let i = 1; i < result.rows.length; i++) {
      columnNames += result.rows[i].column_name + ', ';
    }
    columnNames = columnNames.replace(/,\s*$/, '');
  });
});
console.log('Column names updated');

/**
 * Setup the AMQP channel with RabbitMQ (change host if needed)
 */
amqp.connect(config.rabbitmq.host)
  // connect with amqp server
  .then(function(conn) {
    return conn.createChannel();
  })
  // check if exchange exists and is valid
  .then(function(ch) {
    const ex = config.rabbitmq.exchange_name;
    const q = config.rabbitmq.queue_name;
    ch.assertExchange(ex, 'fanout', {durable: false});
    ch.assertQueue(q, {durable: false});

    // bind internal queue with external exchange and enter ready state
    return ch.bindQueue(q.queue, ex, '')
      .then(function(ok) {
        console.log('Express: waiting for messages in %s', q);

        // start reading objects from the queue
        return ch.consume(q, function(msg) {
          const jsonObj = JSON.parse(msg.content);

          // connect to database and check for errors
          db.pool.connect(function(err, client, done) {
            if (err) {
              return console.error(db.errors.CONNECT_ERROR, err.stack);
            }

            // insert into database and return inserted row as JSON
            const query = 'INSERT INTO packet(' + columnNames + ') ' +
                          'values(' + db.mapJsonToColumns(jsonObj) + ') ' +
                          'RETURNING row_to_json(packet)';
            client.query(query, function(err, result) {
              done();
              if (err) {
                return console.error(db.errors.INSERT_ERROR, err.stack);
              }
              console.log('1 row inserted from RabbitMQ');

              // serialize the data in the proper format
              let serData = [];
              serData.push(result.rows[0].row_to_json)
              serData = bson.serialize(serData);

              // broadcast inserted row to all connected clients
              wss.broadcast = function broadcast(serData) {
                wss.clients.map(client => {
                  // returns true if send success, false if socket is no longer open
                  return client.send(serData);
                });
              };
            });
          });
        }, {noAck: true});
      });
  })
  // catch RabbitMQ queue creation errors
  .catch(function(e) {
    console.error('ERROR: Cannot create channel. Are you sure RabbitMQ is online at ' + config.rabbitmq.host + '?');
    process.exit(1);
  });
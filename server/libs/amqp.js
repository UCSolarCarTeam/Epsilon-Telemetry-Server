const amqp = require('amqplib/callback_api');
const db = require('./database');

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
const rmq_URL = 'amqp://localhost:5672';
amqp.connect(rmq_URL, function(err, conn) {
  try {
    conn.createChannel(function(err, ch) {
      // exchange name must be hermesExchange
      const q = 'msgQueue';
      const ex = 'hermesExchange';

      // check if queue is valid and wait for messages
      ch.assertExchange(ex, 'fanout', {durable: false});
      ch.assertQueue(q, {durable: false});
      ch.bindQueue(q.queue, ex, '');

      console.log('Express: waiting for messages in %s', q);
      ch.consume(q, function(msg) {
        const jsonObj = JSON.parse(msg.content);

        // connect to dattabase and insert data
        db.pool.connect(function(err, client, done) {
          if (err) {
            return console.error(db.errors.CONNECT_ERROR, err.stack);
          }
          const query = 'INSERT INTO packet(' + columnNames + ') ' +
                        'values(' + db.mapJsonToColumns(jsonObj) + ')';
          client.query(query, function(err, result) {
            done();
            if (err) {
              return console.error(db.errors.INSERT_ERROR, err.stack);
            }
            console.log('1 row inserted from RabbitMQ');
          });
        });
      }, {noAck: true});
    });
  } catch (e) {
    if (e instanceof TypeError) {
      console.error('Cannot create channel. Are you sure ' +
                    'RabbitMQ is online at ' + rmq_URL + '?');
      process.exit(1);
    }
  }
});
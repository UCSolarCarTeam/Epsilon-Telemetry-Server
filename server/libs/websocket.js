const WebSocket = require('ws');
const db = require('./database');
const BSON = require('bson');
const server = require('../bin/www').server;

const bson = new BSON();
const wss = new WebSocket.Server({server});

const errors = {
  CONNECT_ERROR: bson.serialize({Error: 'Node couldn\'t connect to PostgreSQL. See Node console for details.'}),
  SELECT_ERROR: bson.serialize({Error: 'Node returned an error during the SELECT query. See Node console for details.'}),
};

wss.on('connection', function(ws, req) {
  pool.connect(function(err, client, done) {
    if (err) {
      wss.send(errors.CONNECT_ERROR);
      return console.error(db.errors.CONNECT_ERROR, err.stack);
    }

    // when client connects, select row with latest telemetry information
    // as a JSON object and send it
    const query = 'SELECT json_agg(latest) ' +
                  'FROM (SELECT * ' +
                        'FROM packet ' +
                        'ORDER BY timestamp DESC LIMIT 1) latest';
    client.query(query, function(err, result) {
      done();
        if (err) {
          ws.send(errors.SELECT_ERROR);
          return console.error(db.errors.SELECT_ERROR, err.stack);
        }

        // send latest telemetry row to client (array with 1 element)
        wss.send(bson.serialize(result.rows));
    });
  });

  // get_past_data event handler to view historical telemetry data
  // MUST receive a JSON object with fields 'start' and 'end' with timestamps
  ws.on('get_past_data', function(msg) {
    pool.connect(function(err, client, done) {
      if (err) {
        ws.send(errors.CONNECT_ERROR);
        return console.error(db.errors.CONNECT_ERROR, err.stack);
      }

      // select rows that fall within the time window specified and return as JSON
      const jsonObj = bson.deserialize(msg);
      const query = 'SELECT json_agg(rows) ' +
                    'FROM (SELECT * ' +
                          'FROM packet ' +
                          'WHERE timestamp > \'' + str(jsonObj.start) + '\' ' +
                          'AND timestamp < \'' + str(jsonObj.end) + '\' ' +
                          'ORDER BY timestamp) rows';
      client.query(query, function(err, result) {
        done();
        if (err) {
          ws.send(errors.SELECT_ERROR);
          return console.error(db.errors.SELECT_ERROR, err.stack);
        }

        // send the rows back in an array
        ws.send(bson.serialize(result.rows));
      });
    });
  });

  // add more event handlers here if needed
});

module.exports.websocket = wss;
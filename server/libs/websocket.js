const WebSocket = require('ws');
const BSON = require('bson');
const db = require('./database').db;
const server = require('../bin/www').server;

const bson = new BSON();
const wss = new WebSocket.Server({server});

const errors = {
  SELECT_ERROR: bson.serialize({Error: 'Node returned an error during the SELECT query. See Node console for details.'}),
};

wss.on('connection', function(ws, req) {
  // when client connects, select row with latest telemetry
  // information as a JSON object and send it
  db.one({
    name: 'client-init',
    text: 'SELECT json_agg(latest) ' +
          'FROM (SELECT * ' +
                'FROM packet ' +
                'ORDER BY timestamp DESC LIMIT 1) latest'
  }).then(result => {
    ws.send(bson.serialize(result.json_agg));
  }).catch(error => {
    ws.send(errors.SELECT_ERROR);
  });

  // get_past_data event handler to view historical telemetry data
  // MUST receive a JSON object with fields 'start' and 'end' with timestamps
  ws.on('get_past_data', function(msg) {
    db.any({
      name: 'client-historical-data',
      text: 'SELECT json_agg(rows) ' +
            'FROM (SELECT * ' +
                  'FROM packet ' +
                  `WHERE timestamp > '${str(jsonObj.start)}' ` +
                  `AND timestamp < '${str(jsonObj.end)}' ` +
                  'ORDER BY timestamp) rows'
    }).then(results => {
      ws.send(bson.serialize(result.rows));
    }).catch(error => {
      ws.send(errors.SELECT_ERROR);
    });
  });

  // add more event handlers here if needed
});

module.exports.bson = bson;
module.exports.websocket = wss;
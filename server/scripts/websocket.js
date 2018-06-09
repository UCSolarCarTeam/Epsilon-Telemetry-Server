const WebSocket = require('ws');
const db = require('./database');
const server = require('../bin/www').server;

const wss = new WebSocket.Server({server});

const errors = {
  SELECT_ERROR: 'Node returned an error during the SELECT query. See Node console for details.',
};

wss.on('connection', function(ws, req) {
  // when client connects, fetch last row in db
  console.log('New client connected!');
  db.last()
    // send to client
    .then((lastRow) => {
      // make the datetime pretty
      ws.send(JSON.stringify(lastRow));
    })
    // send error if cannot fetch last row
    .catch((err) => {
      ws.send({error: errors.SELECT_ERROR});
    });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

module.exports.websocket = wss;

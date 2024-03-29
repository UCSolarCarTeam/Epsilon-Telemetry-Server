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
  db.lastPacket()
    // send to client
    .then((lastRow) => {
      //lastRow['msgType'] = 'packet';
      packet = lastRow[0];
      ws.send(JSON.stringify(packet));
    })
    // send error if cannot fetch last row
    .catch((err) => {
      ws.send({error: errors.SELECT_ERROR});
    });
  db.laps()
  .then((laps) => {
    laps.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1);
    laps.forEach(lap => {
      ws.send(JSON.stringify(lap));
    })
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    try {
      client.send(data);
    }catch {
      console.log('Cannot send packet. Client no longer exits..')
    }
  });
};

module.exports.websocket = wss;

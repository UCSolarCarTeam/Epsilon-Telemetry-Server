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
      // make the datetime pretty
      lastRow['msgType'] = 'packet';
      ws.send(JSON.stringify(lastRow));
    })
    // send error if cannot fetch last row
    .catch((err) => {
      ws.send({error: errors.SELECT_ERROR});
    });
  db.laps()
  .then((laps) => {
    // console.log(laps)
    for (let lap = 0; lap < laps.length; lap++) {
      laps[lap]['msgType'] = 'lap';
      ws.send(JSON.stringify(laps[lap]));
    }
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

module.exports.websocket = wss;

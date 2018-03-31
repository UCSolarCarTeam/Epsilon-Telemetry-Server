const pool = require('../bin/www').pg_pool;
const WebSocket = require('ws');

module.exports.socketSetupAndListen = function(server) {
  const wss = new WebSocket.Server({server});

  wss.on('connection', function(ws, req) {
    ws.on('getData', function(msg) {
      // TODO: read msg payload for authentication and filter query
      pool.connect(function(err, client, done) {
        if (err) {
          let errorMsg = 'Cannot connect to PostgreSQL';
          ws.send(errorMsg);
          return console.error(errorMsg, err.stack);
        }
        const query = 'SELECT * FROM packet ORDER BY id DESC';
        client.query(query, function(err, result) {
          done();
          if (err) {
            let errorMsg = 'Error while querying database';
            ws.send(errorMsg);
            return console.error(errorMsg, err.stack);
          }
          ws.send(result.rows);
        });
      });
    });
  });
};

const WebSocket = require('ws');
const db = require('./database');

/**
 * Function that handles setup and listening of websocket with the Angular app.
 * Listens for a 'getData' event and sends the entire database back.
 * 
 * @param {server object from startup script} server 
 */
module.exports.socketSetupAndListen = function(server) {
  const wss = new WebSocket.Server({server});

  wss.on('connection', function(ws, req) {
    // getData event handler
    ws.on('getData', function(msg) {
      pool.connect(function(err, client, done) {
        if (err) {
          ws.send('Node couldn\'t connect to PostgreSQL. See console for details.');
          return console.error(db.errors.CONNECT_ERROR, err.stack);
        }

        const query = 'SELECT * FROM packet ORDER BY id DESC';
        client.query(query, function(err, result) {
          done();
          if (err) {
            ws.send('Node returned an error during the SELECT query. See console for details.');
            return console.error(db.errors.SELECT_ERROR, err.stack);
          }

          ws.send(result.rows);
        });
      });
    });

    // add more event handlers here if needed
  });
};

const promise = require('promise');
const { MongoClient } = require('mongodb');
const config = require('../config');

/**
 * Postgres options and handlers
 */
const initOptions = {
  promiseLib: promise,
  // Query handler
  query: function(e) {
    // console.log('QUERY:', e.query);
  },
  // Error handler
  error: function(err, e) {
    console.error(err.stack);
    // connection error
    if (e.cn) {
      process.exit(1);
    }
    // query error
    if (e.query) {
      console.error('ERROR: The previous query failed to execute.');
    }
    // context error
    if (e.ctx) {
      console.error('ERROR: An internal database error occured during a transaction or task.');
    }
  },
};

/**
 * Connect to Postgres
 */
const pgp = require('pg-promise')(initOptions);
const db = pgp(config.database);

/**
 * Connect to Mongo
 */
 const uri = config.mongoUri;
 const client = new MongoClient(uri);
 const database = client.db('Test');
 const collection = database.collection('Packets');

 module.exports.connectToDatabase = function() {
  return client.connect();
 }

/**
 * Parses and inserts a JSON object into the database.
 * @param {string} queryName
 * @param {JSON} jsonObj
 * @return {Promise}
 */
module.exports.insert = function(queryName, jsonObj) {
  return collection.insertOne(jsonObj);
};

/**
 * Fetches the last row in the database.
 * @return {Promise}
 */
module.exports.lastPacket = function() {
  return collection.find().sort({TimeStamp : -1}).limit(1).toArray();
  // return db.one({
  //   name: 'client-init',
  //   text: 'SELECT * ' +
  //         'FROM packet ' +
  //         'ORDER BY timestamp DESC LIMIT 1',
  // });
};

/**
 * Fetches all the packets in the database between two timestamps (inclusive)
 * @param {Timestamp} lowestTime
 * @param {Timestamp} highestTime
 * @return {Promise}
 */
module.exports.between = function(lowestTime, highestTime) {
  // return db.any({
  //   name: 'select-between',
  //   text: 'SELECT * ' +
  //         'FROM packet ' +
  //         'GROUP BY packet.id ' +
  //         'HAVING "timestamp" >= $1 AND "timestamp" <= $2 ' +
  //         'ORDER BY timestamp DESC',
  //   values: [lowestTime, highestTime],
  // });
};

/**
* Fetches all the laps in the database
* @return {Promise}
*/
module.exports.laps = function() {
  return db.any({
    name: 'client-init-lap',
    text: 'SELECT * ' +
          'FROM lap ' +
          'ORDER BY timestamp DESC',
  });
};

/**
 * Fetches the last lap in the database
 * @return {Promise}
 */
module.exports.lastLap = function() {
  return db.one({
    name: 'client-last-lap',
    text: 'SELECT * ' +
          'FROM lap ' +
          'ORDER BY timestamp DESC LIMIT 1',
  });
};

/**
* Function that inserts a new lap entry to the lap table
**/
// TODO - Add actual calculations
module.exports.addLap = function(jsonObj) {
  // return db.one({
  //   name: `insertLap`,
  //   text: `INSERT INTO lap (${Object.keys(jsonObj)}) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
  //   values: Object.values(jsonObj),
  // });
};

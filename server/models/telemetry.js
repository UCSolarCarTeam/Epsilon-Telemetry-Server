const bookshelf = require('../bookshelf');

const Telemetry = bookshelf.Model.extend({
  tableName: 'telemetry',
});

module.exports = Telemetry;

const knex = require('knex');
const knexConfig = require('./knexfile');
const bookshelfImport = require('bookshelf');

let bookshelf;

if (process.env.NODE_ENV === 'production') {
  bookshelf = bookshelfImport(knex(knexConfig.production));
} else {
  bookshelf = bookshelfImport(knex(knexConfig.development));
}

module.exports = bookshelf;

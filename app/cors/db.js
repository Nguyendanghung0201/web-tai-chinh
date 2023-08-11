module.exports = require('knex')(config.configDB.mysql);
const { attachPaginate } = require('knex-paginate');
attachPaginate();
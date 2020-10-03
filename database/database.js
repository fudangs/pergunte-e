const sql = require('sequelize');

const conn = new sql('pergunte_e', 'root', 'adilson@4061',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = conn;
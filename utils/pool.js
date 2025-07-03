const mysql = require('mysql2/promise');
const { poolOptions, poolOptionsAdmin } = require('./poolOptions');

const pool = mysql.createPool(poolOptions);

const adminPool = mysql.createPool(poolOptionsAdmin);

module.exports = {
    pool,
    adminPool
}
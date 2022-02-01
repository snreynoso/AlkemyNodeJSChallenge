require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.SQL_DATABASE,
    process.env.SQL_USER,
    process.env.SQL_PASS,
    {
        host: process.env.SQL_HOST,
        port: process.env.SQL_PORT,
        dialect: 'mysql'
    }
);

module.exports = sequelize;
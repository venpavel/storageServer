const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.APP_DB_NAME,
    process.env.APP_DB_USER,
    process.env.APP_DB_PASSWORD,
    {
        host: process.env.APP_DB_HOST,
        dialect: process.env.APP_DB_DIALECT,
    }
);

module.exports = sequelize;

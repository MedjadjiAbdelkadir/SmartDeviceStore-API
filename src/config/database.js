const { Sequelize} = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: process.env.DATABASE_TYPE,
  logging: false
});

module.exports = db
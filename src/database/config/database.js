require('dotenv').config()

const { Sequelize} = require('sequelize')

const db = new Sequelize(process.env.DATABASE_URL_DEV, {
    dialect: process.env.DATABASE_TYPE,
    logging: false  // Set to true to see SQL queries in the console
})

module.exports = db
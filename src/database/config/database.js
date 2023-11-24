require('dotenv').config()

const { Sequelize} = require('sequelize')

const db = new Sequelize(process.env.MYSQL_DATABASE_URL_DEV, {
    dialect: process.env.MYSQL_DATABASE_TYPE,
    logging: false 
})

module.exports = db
const fs = require('fs');

require('dotenv').config();

const { DATABASE_URL_DEV,DATABASE_TYPE} = process.env

module.exports = {
    development: {
        url : DATABASE_URL_DEV,
        dialect: DATABASE_TYPE,
        dialectOptions: {
        bigNumberStrings: true
        }
    },
    test: {
        username: process.env.CI_DB_USERNAME,
        password: process.env.CI_DB_PASSWORD,
        database: process.env.CI_DB_NAME,
        host: '127.0.0.1',
        port: 5432,
        dialect: 'postgres',
        dialectOptions: {
        bigNumberStrings: true
        }
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME,
        host: process.env.PROD_DB_HOSTNAME,
        port: process.env.PROD_DB_PORT,
        dialect: 'postgres',
        dialectOptions: {
        bigNumberStrings: true,
        ssl: {
            // ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
        }
        }
    }
};
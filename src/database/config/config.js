const fs = require('fs');

require('dotenv').config();

module.exports = {
    development: {
        url : process.env.MYSQL_DATABASE_URL_DEV,
        dialect: process.env.MYSQL_DATABASE_TYPE,
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
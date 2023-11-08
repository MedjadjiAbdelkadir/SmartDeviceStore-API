require('../hooks/_index')
require('../associations/_index')

const db = require('./database')

db.authenticate()
.then((response) => console.log('Database Connected Successfully') )
.catch(error => console.log(`Error Connecting${  error.message}`))

module.exports = db
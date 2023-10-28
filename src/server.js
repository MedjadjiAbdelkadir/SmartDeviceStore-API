const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors())
// app.use(cors({
//     origin: 'http://127.0.0.1:3000',
// }))
require('dotenv').config()

app.use('/uploads', express.static(path.join(__dirname,'uploads')))


const routes = require('./routes/index');
const middlewares = require('./middlewares/middlewares');
const db = require('./config/database');

db.authenticate()
.then((res) => console.log('Database Connected') )
.catch(err => console.log(`Error Connecting${ err.message}`))

require('./models/_index')
// const SubCategory = require('./models/subCategory'); // Adjust the path to your model file
// const Category = require('./models/category');

// Routes
app.use('/api', routes)
// middlewares
middlewares(app)
// app.use((req, res, next) =>next(middlewares(app)))
// app.use(middlewares)

// app.use((error, req, res , next)=> next(error))

// app.use((error, req, res , next)=>{
//     res.status(error.statusCode || 400).json({
//         'errorCode': error.statusCode,
//         'status' : error.status,
//         'message': error.message,
//     });
// })

const { HOST , PORT} = process.env;
// Starting Server 
const server = app.listen(PORT || 4000 , HOST, () => {
    console.log(`Server started at http://${HOST}:${PORT}`);
});


// Handle rejection outside express
process.on('unhandledRejection', (err) => {
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(() => {
        console.error(`Server Has down....`);
        process.exit(1);
    });
});
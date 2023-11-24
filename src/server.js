const path = require('path')
require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

// Handle Uncaught Exception 
process.on('UncaughtException', (err)=>{
    console.error('Uncaught Exception! Shutting down ...')
    console.error(err.name,err.message)
    process.exit(1)
})



const corsOptions = {
    origin: "http://localhost:8081"
}
// app.use(express.json())
app.use(cors(corsOptions))

const routes = require('./routes')
const middlewares = require('./middleware')
const db = require('./database/config/database')

app.use('/uploads', express.static(path.join(__dirname,'uploads')))

app.use('/api/v1', routes)
middlewares(app)

db.authenticate().then(()=>{
    console.log('Server has successfully connected to the database')
})

const port = process.env.PORT || 4000
const host = process.env.HOST
const server = app.listen(port, host, () => {
    console.log(`Server started at http://${host}:${port}`)
})

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection! Shutting down ...')
    console.error(err.name,err.message)
    server.close(() => {
        console.error(`Server Has down....`)
        process.exit(1)
    })
})

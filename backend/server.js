
require('dotenv').config()

//creating exprss app
const express = require('express') 

const mongoose = require('mongoose')
//created this after naming routes in bugtrack.js and exporting
const bugtrackRoutes = require('./routes/bugtrack')


//using mongoose to connect to db
mongoose.connect(process.env.MONGO_URI)
//only listen to requests when connected to db
.then(() => {
//listening for requests
    app.listen(process.env.PORT, () => {
    console.log('Connected and Listening on port 9000')
})
})
.catch((error) => {
    console.log(error)
})
const app = express()

//creating middleware that checks if
//data sent to db has body/data to it
app.use(express.json())


//creating global middleware
//that logs every request path and method
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


//setting up route handler
//this is local middleware testing api
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome there buddah'})
})

//creating a route
app.use('/api/bugtrack/', bugtrackRoutes)
//grabs all the different routes in bugtrack.js
//and uses them on the app 


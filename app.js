const express = require('express')
const app = express()
const mongoose = require('mongoose');
const apiV1Router = require('./Controllers/api_v1_controller');
require('dotenv').config()


app.use(express.json());
app.use('/api/v1',apiV1Router)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to db"))
    .catch(() => console.error("Error connecting to the database"))

module.exports=app
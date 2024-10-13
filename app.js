const express = require('express')
const app = express()
const mongoose = require('mongoose');
const UserRouter = require('./Controllers/UserController');
const EmpRouter = require('./Controllers/EmpController');
require('dotenv').config()


app.use(express.json());
app.use('/api/v1/user',UserRouter)
app.use('/api/v1/emp/employees',EmpRouter)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to db"))
    .catch((err) => console.error(err))

module.exports={app}
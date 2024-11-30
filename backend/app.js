const express = require('express')
const app = express()
const mongoose = require('mongoose');
const UserRouter = require('./Controllers/UserController');
const EmpRouter = require('./Controllers/EmpController');
const cookieParser = require("cookie-parser")
const cors = require("cors")
require('dotenv').config()

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,              
  };
  
  app.use(cors(corsOptions));

app.use(cookieParser())

app.use(express.json());
app.use('/api/v1/user',UserRouter)
app.use('/api/v1/emp/employees',EmpRouter)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to db"))
    .catch((err) => console.error(err))

module.exports={app}
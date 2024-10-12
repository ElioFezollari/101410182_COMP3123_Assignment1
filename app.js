const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

module.exports=app
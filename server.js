const express = require('express');

const app = express();

const connectDB = require('./config/db')


// Connect to data base

connectDB();

app.get('/',(req,res)=>{
    res.send("API running");
})

const PORT = process.env.PORT || 5000;  // in heroku || in local 

app.listen(PORT,console.log(`server started on port ${PORT}`))
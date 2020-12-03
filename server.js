const express = require('express');

const app = express();

const connectDB = require('./config/db')


// Connect to data base

connectDB();

app.get('/',(req,res)=>{
    res.send("API running");
})

// Define routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/post', require('./routes/api/post'));
app.use('/api/profile', require('./routes/api/profile'));


const PORT = process.env.PORT || 5000;  // in heroku || in local 

app.listen(PORT,console.log(`server started on port ${PORT}`))
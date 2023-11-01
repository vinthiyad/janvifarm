const express = require('express');
const app= express();
const errorMiddleware = require('./middleware/error');
const cookieparser = require("cookie-parser");
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path:path.join(__dirname,"config/config.env")});   
console.log("AT ---->",process.env.NODE_ENV);


app.use(express.json());   
app.use(cookieparser());  
app.use('/upload',express.static(path.join(__dirname,'upload')));


const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment= require('./routes/payment');

app.use('/api/v1',products);
app.use('/api/v1',auth);
app.use('/api/v1',order);   
app.use('/api/v1',payment);     


if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

app.use(errorMiddleware);   

module.exports = app;
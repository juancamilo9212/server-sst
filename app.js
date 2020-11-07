const express = require('express');
const bodyParser=require('body-parser');
const app = express();
const {API_VERSION} = require('./config');

//TODO:Load routes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const accidentRoutes=require('./routes/accidents');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//TODO:Configure header HTTP


//Basic Routes
app.use(`/api/${API_VERSION}`,userRoutes);
app.use(`/api/${API_VERSION}`,authRoutes);
app.use(`/api/${API_VERSION}`,accidentRoutes);


module.exports = app;
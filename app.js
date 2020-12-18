const express = require('express');
const bodyParser=require('body-parser');
const app = express();
const {API_VERSION} = require('./config');

//TODO:Load routes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const accidentRoutes=require('./routes/accidents');
const extintorRoutes=require('./routes/extintor');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//TODO:Configure header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

//Basic Routes
app.use(`/api/${API_VERSION}`,userRoutes);
app.use(`/api/${API_VERSION}`,authRoutes);
app.use(`/api/${API_VERSION}`,accidentRoutes);
app.use(`/api/${API_VERSION}`,extintorRoutes);



module.exports = app;
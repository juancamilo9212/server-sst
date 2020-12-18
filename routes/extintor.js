const express = require('express');
const ExtintorController = require('../controllers/extintor');
const api=express.Router();

api.post("/add-extintor/:_id",ExtintorController.addExtintor);//user id

module.exports = api;
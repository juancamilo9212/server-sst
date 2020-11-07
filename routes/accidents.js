const express = require('express');
const AccidentController = require('../controllers/accidents');
const api=express.Router();

api.post("/add-accident/:_id",AccidentController.addAccident);
api.get("/get-accidents/:_id", AccidentController.getAccidents);

module.exports = api;
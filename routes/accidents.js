const express = require('express');
const AccidentController = require('../controllers/accidents');
const api=express.Router();

api.post("/add-accident/:_id",AccidentController.addAccident);//user id
api.get("/get-accidents/:_id", AccidentController.getAccidents);//user id
api.put("/update-accident/:_id",AccidentController.updateAccident);//accident id
api.delete("/remove-accident/:_id",AccidentController.removeAccident);//accident id

module.exports = api;
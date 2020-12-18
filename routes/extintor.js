const express = require('express');
const ExtintorController = require('../controllers/extintor');
const api=express.Router();

api.post("/add-extintor/:_id",ExtintorController.addExtintor);//user id
api.get("/get-extintors/:_id",ExtintorController.getExtintors);//user id
api.put("/update-extintor/:_id",ExtintorController.updateExtintor);
api.delete("/remove-extintor/:_id",ExtintorController.removeExtintor);
module.exports = api;
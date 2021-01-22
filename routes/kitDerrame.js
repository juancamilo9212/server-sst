const express = require('express');
const KitDerrameController = require('../controllers/kitDerrame');
const api=express.Router();

api.post("/add-kitDerrame/:_id",KitDerrameController.addKitDerrame);//user id
api.get("/get-kitsDerrame/:_id",KitDerrameController.getKitsDerrame);//user id
api.put("/update-kitDerrame/:_id",KitDerrameController.updateKitDerrame);
api.delete("/remove-kitDerrame/:_id",KitDerrameController.removeKitDerrame);
module.exports = api;
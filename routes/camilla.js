const express = require('express');
const CamillasController = require('../controllers/camilla');
const api=express.Router();

api.post("/add-camilla/:_id",CamillasController.addCamilla);//user id
api.get("/get-camillas/:_id",CamillasController.getCamillas);//user id
api.put("/update-camilla/:_id",CamillasController.updateCamilla);
api.delete("/remove-camilla/:_id",CamillasController.removeCamilla);
module.exports=api;
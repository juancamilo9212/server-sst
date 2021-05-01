const express = require('express');
const BotiquinesController = require('../controllers/botiquin');
const api=express.Router();

api.post("/add-botiquin/:_id",BotiquinesController.addBotiquin);//user id
api.get("/get-botiquines/:_id",BotiquinesController.getBotiquines);//user id
api.put("/update-botiquin/:_id",BotiquinesController.updateBotiquin);
api.delete("/remove-botiquin/:_id",BotiquinesController.removeBotiquin);
module.exports=api;
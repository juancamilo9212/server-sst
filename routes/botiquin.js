const express = require('express');
const BotiquinesController = require('../controllers/botiquin');
const api=express.Router();

api.post("/add-botiquin/:_id",BotiquinesController.addBotiquin);//user id

module.exports=api;
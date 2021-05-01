const express = require('express');
const AccidentController = require('../controllers/accidents');
const api=express.Router();
const multipart=require('connect-multiparty');
const md_upload_file=multipart({uploadDir:'./uploads/event'});

api.post("/add-accident/:_id",AccidentController.addAccident);//user id
api.get("/get-accidents/:_id", AccidentController.getAccidents);//user id
api.put("/update-accident/:_id",AccidentController.updateAccident);//accident id
api.delete("/remove-accident/:_id",AccidentController.removeAccident);//accident id
api.post("/upload-event-files/",[md_upload_file],AccidentController.uploadEventFiles);
api.get("/get-event-file/:eventFileName",AccidentController.getEventFiles);
api.delete("/delete-event-file/:eventFileName",AccidentController.deleteEventFiles);
api.get("/accident-report/:_id",AccidentController.getAccidentReport);
module.exports = api;
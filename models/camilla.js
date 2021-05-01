const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const Camilla = new Schema({
company:String,
location:String,
araña:String,
hebillas:String,
cabecera:String,
pasta:String,
tela:String,
soporte:String,
inspections:[
    {
        inspectionDate:Date,
        inspectionComments:String
    }
],
user:[{
    type: Schema.Types.ObjectId,
    ref: 'User'
}]
});

module.exports = mongoose.model("Camilla",Camilla);
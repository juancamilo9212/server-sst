const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const Botiquin = Schema({
guanteNitrilo:Boolean,
tapabocas:Boolean,
aguaDestilada:Boolean,
solucionSalina:Boolean,
jabonAntiseptico:Boolean,
gasa:Boolean,
mantaTermica:Boolean,
curas:Boolean,
bajalenguas:Boolean,
parcheOcular:Boolean,
tijeras:Boolean, 
micropore:Boolean,
vendas:Boolean,
adicionals:[
    {
    component:String,
    state:Boolean
    }
],
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
})

module.exports = mongoose.model("Botiquin",Botiquin);
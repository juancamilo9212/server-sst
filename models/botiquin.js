const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const Botiquin = Schema({
guanteNitrilo:{
isEnabled:Boolean,
quantity:String
},
tapabocas:{
isEnabled:Boolean,
quantity:Number
},
aguaDestilada:Boolean,
solucionSalina:Boolean,
jabonAntiseptico:Boolean,
gasa:Boolean,
mantaTermica:{
isEnabled:Boolean,
quantity:Number
},
curas:{
isEnabled:Boolean,
quantity:Number
},
bajalenguas:{
isEnabled:Boolean,
quantity:Number
},
parcheOcular:{
isEnabled:Boolean,
quantity:Number
},
tijeras:{
isEnabled:Boolean,
quantity:Number
}, 
micropore:Boolean,
vendas:Boolean,
company:String,
location:String,
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
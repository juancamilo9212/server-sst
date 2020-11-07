const Accident= require('../models/accidents');
const User=require('../models/user');

async function addAccident(req,res){

const accident = new Accident(req.body);
const user= await User.findOne({_id:req.params});
accident.user=user;
try {
    await accident.save();
} catch (error) {
    res.status(500).send(error);
}
user.accidents.push(accident);
await user.save((err,userStored) => {
    if(err){
        res.status(500).send("Error del servidor");
    }else{
        if(!userStored){
            res.status(404).send("El usuario no ha sido encontrado");
        }else{
            res.status(200).send(accident);
        }
    }
});
}

async function getAccidents(req,res){
await User.findOne({_id:req.params})
.populate('accidents').exec((err,userStored) => {
    if(err){
        res.status(500).send("Error del servidor");
    }else{
        if(!userStored){
            res.status(404).send("Los accidentes no han sido encontrados");
        }else{
            res.status(200).send(userStored.accidents);
        }
    }
});
}

module.exports = {
    addAccident,
    getAccidents
}
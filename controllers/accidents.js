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

async function updateAccident(req,res){
const id = req.params;
const updateData=req.body;
await Accident.findByIdAndUpdate(id,updateData,(err,updatedAccident) => {
    if(err){
        res.status(500).send("Error del servidor");
    }else{
        if(!updatedAccident){
            res.status(404).send("El accidente no ha sido encontrado");
        }else{
            res.status(200).send("El usuario ha sido actualizado correctamente");
        }
    }
}) 
}

async function removeAccident(req,res){
const accidentId=req.params;
let accident;
try {
    accident = await Accident.findById(accidentId);
} catch (error) {
    if(!accident){
        res.status(404).send({message: "El accidente no ha sido encontrado"})
    }    
}
const userId=accident.user;
let user;
let updatedAccidents;
try {
    user=await User.findById(userId);
    updatedAccidents=user.accidents.filter(value => {
        return value != accidentId._id;
    });
    user.accidents=updatedAccidents;
    await user.save();
} catch (error) {
    res.status(500).send({message:"No se pudo actualizar el usuario"})
}

await Accident.findByIdAndRemove(accidentId, (err,accidentRemoved) =>{
    if(err){
        res.status(500).send("Error del servidor");
    }else{
        if(!accidentRemoved){
            res.status(404).send("El accidente no se ha encontrado");
        }else{
            res.status(200).send({message:"El accidente ha sido eliminado correctamente"});
        }
    }
})



}

module.exports = {
    addAccident,
    getAccidents,
    updateAccident,
    removeAccident
}
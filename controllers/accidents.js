const Accident= require('../models/accidents');
const User=require('../models/user');
const fs = require("fs");
const path = require("path");
const accidentLib= require('../lib/accidents/index');
var mime = require('mime');


async function addAccident(req,res){

const accident = new Accident(req.body);
const user= await User.findOne({_id:req.params});
let accidentSaved=false;
accident.user=user;
let errorMsg="";
try {
    await accident.save();
    accidentSaved=true;
} catch (error) {
    errorMsg = error.message;
}
if(accidentSaved) {
user.accidents.push(accident);
res.status(200).send(accident);
user.save();
} else {
res.status(500).send(errorMsg);
}
}

/*async function addAccident(req,res){

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
    }*/

async function getAccidents(req,res){
    const {filter,value} = req.query;
    await User.findOne({_id:req.params})
    .populate('accidents').exec((err,userStored) => {
        if(err){
            res.status(500).send("Error del servidor");
        }else{
            if(!userStored){
                res.status(404).send("Los accidentes no han sido encontrados");
            }else{
                if(!filter && !value){
                    res.status(200).send({
                    count:userStored.accidents.length,
                    accidents:userStored.accidents});
                }else{
                    const {accidents}=userStored;
                    let accidentsFiltered=
                    accidentLib.filterAccident(accidents,filter,value);
                    res.status(200).send(
                        {count:accidentsFiltered.length,
                        accidents:accidentsFiltered});
                }
            }
        }
    });
}

async function updateAccident(req,res){
const id = req.params;
const updateData=req.body;
try {
const updatedAccident = await Accident.findOneAndUpdate(id,updateData,{runValidators:true});
res.status(200).send({code:200,accident:updatedAccident});  
} catch (error) {
res.status(500).send({message:error})
}
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

function uploadEventFiles(req,res){
    
    try {
    const {eventFiles} = req.files;
    const eventArray=eventFiles ? 
    accidentLib.getFilesName(eventFiles)
    :[];
    res.status(200).send({code:200,images:eventArray});
    } catch (error) {
        res.status(500)
        .send({message:"No se han podido cargar los archivos"})
    }
    
}

function  getEventFiles(req,res){
const {eventFileName}=req.params;
const filePath=`./uploads/event/${eventFileName}`;
var mimetype = mime.getType(filePath);
fs.exists(filePath,exists => {
    if(!exists){
        res.status(404).send({message:"Archivo no encontrado"})
    }else{
        res.setHeader('Content-disposition', 'attachment; filename=' + eventFileName);
        res.setHeader('Content-type', mimetype);
        res.sendFile(path.resolve(filePath));
    }
})
}

function deleteEventFiles(req,res){
    const {eventFileName}=req.params;
    const filePath = `./uploads/event/${eventFileName}`;
    fs.unlink(filePath, err => {
        if(err){
            res.status(404).send({message:"Error al borrar el archivo"});
        }else{
            res.status(200).send({code:200,message:"OK"})
        }
    })
}

async function getAccidentReport(req,res){
    const accidentId = req.params;
    let accident;
    try {
    accident = await Accident.findById(accidentId);
    if(!accident){
        res.status(404).send({message:"No se ha encontrado el accidente"});
    }else{
        const template = accidentLib.accidentTemplate(accident);
        accidentLib.generateReport(template).then(pdf => {
            res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
            res.status(200).send(pdf);
        });
        }   
    } catch (error) {
    res.status(500).send({message:"Error del servidor"});
    }
}


module.exports = {
    addAccident,
    getAccidents,
    updateAccident,
    removeAccident,
    uploadEventFiles,
    getEventFiles,
    deleteEventFiles,
    getAccidentReport
}


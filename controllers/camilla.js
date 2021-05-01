const User=require('../models/user');
const resourceLib=require('../lib/resources/index');
const Camilla = require('../models/camilla');

async function addCamilla(req,res) {
    const camilla = new Camilla(req.body);
    const user = await User.findOne({_id:req.params});
    camilla.user = user;
    let {camillas} = user;
    resourceLib.addResource(user,camilla,camillas,res);
}

async function getCamillas(req,res) {
    await User.findOne({_id:req.params})
    .populate("camillas").exec((err,userStored) => {
        if(err){
            res.status(500).send({message:"Error del servidor"})
        }else{
            if(!userStored){
                res.status(404).send({message:"Usuario no encontrado"})
            }else{
                const {camillas} = userStored;
                res.status(200).send({
                    code:200,
                    camillas:camillas
                })
            }
        }
    })
}

async function updateCamilla(req,res) {
    const id = req.params;
    const updateData=req.body;
    await Camilla.findByIdAndUpdate(id,updateData,(err,updatedCamilla) => {
        if(err){
            res.status(500).send("Error del servidor");
        }else{
            if(!updatedCamilla){
                res.status(404).send("La camilla no ha sido encontrada");
            }else{
                res.status(200)
                .send({code:200,camilla:updatedCamilla});
            }
        }
    })
}

async function removeCamilla(req,res) {
    const camillaId=req.params;
    let camilla;
    try {
        camilla = await Camilla.findById(camillaId);
        } catch (error) {
        if(!camilla){
            res.status(404).send({message: "La camilla no ha sido encontrada"})
            }    
        }
        const userId=camilla.user;
        let user;
        let updatedCamillas;
        try {
            user=await User.findById(userId);
            updatedCamillas=user.camillas.filter(value => {
                return value != camillaId._id;
            });
            user.camillas=updatedCamillas;
            await user.save();
        } catch (error) {
            res.status(500).send({message:"No se pudo actualizar el usuario"})
        }
        await Camilla.findByIdAndRemove(camillaId, (err,camillaRemoved) =>{
            if(err){
                res.status(500).send("Error del servidor");
            }else{
                if(!camillaRemoved){
                    res.status(404).send("La camilla no se ha encontrado");
                }else{
                    res.status(200).send({message:"La camilla ha sido eliminada correctamente"});
                }
            }
        })
}

module.exports={
    addCamilla,
    getCamillas,
    updateCamilla,
    removeCamilla
}
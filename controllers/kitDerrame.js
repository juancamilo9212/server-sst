const KitDerrame = require('../models/kitDerrame');
const User=require('../models/user');
const resourceLib=require('../lib/resources/index');

async function addKitDerrame(req,res){
    const kitDerrame = new KitDerrame(req.body);
    const user= await User.findOne({_id:req.params});
    kitDerrame.user = user;
    let {kitsDerrame} = user;
    resourceLib.addResource(user,kitDerrame,kitsDerrame,res);
}

async function getKitsDerrame(req,res){
    await User.findOne({_id:req.params})
    .populate("kitsDerrame").exec((err,userStored) => {
        if(err){
            res.status(500).send({message:"Error del servidor"})
        }else{
            if(!userStored){
                res.status(404).send({message:"Usuario no encontrado"})
            }else{
                const {kitsDerrame} = userStored;
                res.status(200).send({
                    code:200,
                    kitsDerrame:kitsDerrame
                })
            }
        }
    })
}

async function updateKitDerrame(req,res){
    const id = req.params;
    const updateData=req.body;
    await KitDerrame.findByIdAndUpdate(id,updateData,(err,updatedKit) => {
        if(err){
            res.status(500).send("Error del servidor");
        }else{
            if(!updatedKit){
                res.status(404).send("El kit de derrame no ha sido encontrado");
            }else{
                res.status(200)
                .send({code:200,kitsDerrame:updatedKit});
            }
        }
    })
}

async function removeKitDerrame(req,res){
    const kitId=req.params;
    let kitDerrame;
    try {
        kitDerrame = await KitDerrame.findById(kitId);
    } catch (error) {
        if(!kitsDerrame){
            res.status(404).send({message: "El kit de derrame no ha sido encontrado"})
            }    
        }
        const userId=kitDerrame.user;
        let user;
        let updatedKitDerrames;
        try {
            user=await User.findById(userId);
            updatedKitDerrames=user.kitsDerrame.filter(value => {
                return value != kitId._id;
            });
            user.kitsDerrame=updatedKitDerrames;
            await user.save();
        } catch (error) {
            res.status(500).send({message:"No se pudo actualizar el usuario"})
        }
        
        await KitDerrame.findByIdAndRemove(kitId, (err,kitDerrameRemoved) =>{
            if(err){
                res.status(500).send("Error del servidor");
            }else{
                if(!kitDerrameRemoved){
                    res.status(404).send("El kit de derrame no se ha encontrado");
                }else{
                    res.status(200).send({message:"El kit de derrame ha sido eliminado correctamente"});
                }
            }
        })
}

module.exports = {
    addKitDerrame,
    getKitsDerrame,
    updateKitDerrame,
    removeKitDerrame
}
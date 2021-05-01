const User=require('../models/user');
const resourceLib=require('../lib/resources/index');
const Botiquin = require('../models/botiquin');

async function addBotiquin(req,res){
    const botiquin = new Botiquin(req.body);
    const user = await User.findOne({_id:req.params});
    botiquin.user = user;
    let {botiquines} = user;
    resourceLib.addResource(user,botiquin,botiquines,res);
}

async function getBotiquines(req,res){
    await User.findOne({_id:req.params})
    .populate("botiquines").exec((err,userStored) => {
        if(err){
            res.status(500).send({message:"Error del servidor"})
        }else{
            if(!userStored){
                res.status(404).send({message:"Usuario no encontrado"})
            }else{
                const {botiquines} = userStored;
                res.status(200).send({
                    code:200,
                    botiquines:botiquines
                })
            }
        }
    })
}

async function updateBotiquin(req,res){
    const id = req.params;
    const updateData=req.body;
    await Botiquin.findByIdAndUpdate(id,updateData,(err,updatedBotiquin) => {
        if(err){
            res.status(500).send("Error del servidor");
        }else{
            if(!updatedBotiquin){
                res.status(404).send("El botiquin no ha sido encontrado");
            }else{
                res.status(200)
                .send({code:200,botiquin:updatedBotiquin});
            }
        }
    })
}

async function removeBotiquin(req,res){
    const botiquinId=req.params;
    let botiquin;
    try {
        botiquin = await Botiquin.findById(botiquinId);
        } catch (error) {
        if(!botiquin){
            res.status(404).send({message: "El botiquin no ha sido encontrado"})
            }    
        }
        const userId=botiquin.user;
        let user;
        let updatedBotiquines;
        try {
            user=await User.findById(userId);
            updatedBotiquines=user.botiquines.filter(value => {
                return value != botiquinId._id;
            });
            user.botiquines=updatedBotiquines;
            await user.save();
        } catch (error) {
            res.status(500).send({message:"No se pudo actualizar el usuario"})
        }
        await Botiquin.findByIdAndRemove(botiquinId, (err,botiquinRemoved) =>{
            if(err){
                res.status(500).send("Error del servidor");
            }else{
                if(!botiquinRemoved){
                    res.status(404).send("El botiquin no se ha encontrado");
                }else{
                    res.status(200).send({message:"El botiquin ha sido eliminado correctamente"});
                }
            }
        })
}

module.exports={
    addBotiquin,
    getBotiquines,
    updateBotiquin,
    removeBotiquin
}
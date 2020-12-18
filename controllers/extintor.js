const Extintor= require('../models/extintor');
const User=require('../models/user');

async function addExtintor(req,res){
    const extintor = new Extintor(req.body);
    const user= await User.findOne({_id:req.params});
    extintor.user = user;
    try {
        await extintor.save();
    } catch (error) {
        res.status(500).send(error);
    }
    user.extintors.push(extintor);
    await user.save((err,userStored) => {
        if(err){
            res.status(500).send("Error del servidor");
        }else{
            if(!userStored){
                res.status(404).send("El usuario no ha sido encontrado");
            }else{
                res.status(200).send(extintor);
            }
        }
    });
}

async function getExtintors(req,res){
    
    await User.findOne({_id:req.params})
    .populate("extintors").exec((err,userStored) => {
        if(err){
            res.status(500).send({message:"Error del servidor"})
        }else{
            if(!userStored){
                res.status(404).send({message:"Usuario no encontrado"})
            }else{
                res.status(200).send({
                    code:200,
                    extintors:userStored.extintors
                })
            }
        }
    })

}

async function updateExtintor(req,res){
    const id = req.params;
    const updateData=req.body;
    await Extintor.findByIdAndUpdate(id,updateData,(err,updatedExtintor) => {
        if(err){
            res.status(500).send("Error del servidor");
        }else{
            if(!updatedExtintor){
                res.status(404).send("El accidente no ha sido encontrado");
            }else{
                res.status(200)
                .send({code:200,accident:updatedExtintor});
            }
        }
    }) 
    }

async function removeExtintor(req,res){
    const extintorId=req.params;
    let extintor;
    try {
        extintor = await Extintor.findById(extintorId);
    } catch (error) {
        if(!extintor){
            res.status(404).send({message: "El extintor no ha sido encontrado"})
            }    
        }
        const userId=extintor.user;
        let user;
        let updatedExtintors;
        try {
            user=await User.findById(userId);
            updatedExtintors=user.extintors.filter(value => {
                return value != extintorId._id;
            });
            user.extintors=updatedExtintors;
            await user.save();
        } catch (error) {
            res.status(500).send({message:"No se pudo actualizar el usuario"})
        }
        
        await Extintor.findByIdAndRemove(extintorId, (err,extintorRemoved) =>{
            if(err){
                res.status(500).send("Error del servidor");
            }else{
                if(!extintorRemoved){
                    res.status(404).send("El extintor no se ha encontrado");
                }else{
                    res.status(200).send({message:"El extintor ha sido eliminado correctamente"});
                }
            }
        })
        }

module.exports ={
    addExtintor,
    getExtintors,
    updateExtintor,
    removeExtintor
}
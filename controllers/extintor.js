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

module.exports ={
    addExtintor
}
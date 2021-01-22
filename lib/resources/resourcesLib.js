
async function addResource(user,resourceObject,resourceArray,res){
    try {
        await resourceObject.save();
    } catch (error) {
        res.status(500).send(error);
    }
    resourceArray.push(resourceObject);
    await user.save((err,userStored) => {
        if(err){
            res.status(500).send("Error del servidor");
        }else{
            if(!userStored){
                res.status(404).send("El usuario no ha sido encontrado");
            }else{
                res.status(200).send(resourceObject);
            }
        }
    });
}

async function updateResource(resource,res){
    await resource.findByIdAndUpdate(id,updateData,(err,updatedExtintor) => {
        if(err){
            res.status(500).send("Error del servidor");
        }else{
            if(!updatedExtintor){
                res.status(404).send("El accidente no ha sido encontrado");
            }else{
                return updatedExtintor;
            }
        }
    }) 
}

module.exports = {
    addResource,
    updateResource
}
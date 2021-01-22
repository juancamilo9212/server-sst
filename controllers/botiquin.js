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

module.exports={
    addBotiquin
}
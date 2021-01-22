const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=Schema({
    name: String,
    lastName:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    active:Boolean,
    accidents:[{
            type: Schema.Types.ObjectId,
            ref: 'Accident' 
    }],
    extintors:[{
        type: Schema.Types.ObjectId,
        ref: 'Extintor'
    }],
    kitsDerrame:[{
        type: Schema.Types.ObjectId,
        ref: 'KitsDerrame'
    }],
    botiquines:[{
        type: Schema.Types.ObjectId,
        ref: 'Botiquin'
    }]
})

module.exports = mongoose.model("User",UserSchema);
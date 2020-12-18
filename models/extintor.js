const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const ExtintorSchema = Schema({
    serialNumber: String,
    loadDate:Date,
    nextLoadDate:Date,
    kindOfAgent:String,
    company:String,
    location:String,
    user:[{
        type: Schema.Types.ObjectId,
            ref: 'User'
    }]
})

module.exports = mongoose.model("Extintor",ExtintorSchema);
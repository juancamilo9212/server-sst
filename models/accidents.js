const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const AccidentSchema = Schema({
    name: {
    type:String,
    required:true    
    },
    lastName: {
    type:String,
    required:true    
    },
    idNumber:
    {
    type:String,
    required:true    
    },
    company:{
    type:String,
    required:true    
    },
    eventDate:{
    type:Date,
    required:true    
    },
    arrivalDate:{
    type:Date,
    required:true    
    },
    area:String,
    bodyPartAffected:
    {
    type:String,
    required:true    
    },
    description:
    {
    type:String,
    required:true    
    },
    witness:Boolean,
    witnessName:String,
    witnessIdNumber:String,
    additionalComments:String,
    reporterName:String,
    brigadeMember:String,
    accidentType:
    {
    type:String,
    required:true    
    },
    researched:Boolean,
    researcherName:String,
    researchDate:Date,
    actionPlan:String,
    actionExecutionDate:Date,
    state:Boolean,
    images:[{
        type: String
    }],
    actionPlanImages:[{
        type: String
    }],
    user:[{
        type: Schema.Types.ObjectId,
            ref: 'User'
    }]
})

module.exports = mongoose.model("Accident",AccidentSchema);
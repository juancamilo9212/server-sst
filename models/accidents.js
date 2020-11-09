const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const AccidentSchema = Schema({
    name: String,
    lastName: String,
    idNumber:String,
    company:String,
    eventDate:Date,
    arrivalDate:Date,
    area:String,
    bodyPartAffected:String,
    description:String,
    accidentVersion:String,
    witness:Boolean,
    witnessName:String,
    witnessIdNumber:String,
    additionalComments:String,
    reporterName:String,
    brigadeMember:String,
    accidentType:String,
    researched:Boolean,
    researcherName:String,
    researchDate:Date,
    actionPlan:String,
    actionExecutionDate:Date,
    state:Boolean,
    images:[String],
    actionPlanImages:[String],
    user:[{
        type: Schema.Types.ObjectId,
            ref: 'User'
    }]
})

module.exports = mongoose.model("Accident",AccidentSchema);
const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const KitDerrameSchema = Schema({
    serialNumber: String,
    company:String,
    location:String,
    components:[
        {
            component:String,
            expirationDate:Date
        }
    ],
    inspections:[
        {
            inspectionDate:Date,
            inspectionComments:String
        }
    ],
    user:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = mongoose.model("KitsDerrame",KitDerrameSchema);
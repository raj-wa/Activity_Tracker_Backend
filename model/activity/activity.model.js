const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    title: String,
    activity:[{
        date:String,
        isTrue:Boolean
    }],
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

module.exports = mongoose.model('Activity', activitySchema)
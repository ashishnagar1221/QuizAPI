const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const UserSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    followedBy:[
        {
            type:ObjectId,
            ref:"Users"
        }
    ]
})

const Topics = mongoose.model('Topics',UserSchema);

module.exports = Topics;
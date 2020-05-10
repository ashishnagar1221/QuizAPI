const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const UserSchema  = new mongoose.Schema({
    attemptBy: {
        type:ObjectId,
        ref:"Users"
    },
    score:{
        type:Number,
        required:true
    },
    answerTally:[
        {
            quesID: String,
            marked_choice: Number
        }
    ]
})

const Topics = mongoose.model('Topics',UserSchema);

module.exports = Topics;
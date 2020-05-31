const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const UserSchema  = new mongoose.Schema({
    attemptBy: {
        type:ObjectId,
        ref:"Users"
    },
    topic:{
        type:String
    },
    score:{
        type:Number,
        required:true
    },
    answerTally:[
        {
            quesID: String,
            question:String,
            marked_choice: Number,
            correct_choice:Number,
        }
    ]
})

const Quiz = mongoose.model('Quiz',UserSchema);

module.exports = Quiz;
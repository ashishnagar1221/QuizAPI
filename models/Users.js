const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const UserSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    topic_followed:[
        {
            type:ObjectId,
            ref:"Topics"
        }
    ],
    quiz_attempted:[
        {
            type:ObjectId,
            ref:"Quizs" 
        }
    ]
})

const User = mongoose.model('User',UserSchema);

module.exports = User;
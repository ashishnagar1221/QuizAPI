const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const quesSchema  = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    options:{
        type:Array,
        required:true
    },
    answer:{
        type:Number,
        required:true
    },
    topic:{
        type:ObjectId,
        ref:"topic"
    }
})

const Question = mongoose.model('Question',quesSchema);

module.exports = Question;
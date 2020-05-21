const express = require('express')
const router = express.Router();
const Ques = require("../models/questions")
const Topics = require('../models/Topics')
const Quiz = require('../models/Quizs')
const User = require('../models/Users')
const requireLogin  = require("../middleware/token")

router.post('/addTopics',(req,res) =>{
    const {name,category,Description} = req.body;
    if(!name || !category || !Description){
        return res.status(422).json({error:"please add all the fields"}) 
    }
    const newTopic = new Topics({
        name,category,Description
    });
    newTopic.save()
    .then(result =>{
        res.json({message:"new topic added successfully"})
    })
    .catch(err =>{
        console.log(err)
    })
})

router.post('/addQuestion',(req,res)=>{
    const {question,options,answer,topic} = req.body;
    console.log(req.body)
    if(!question || !options|| !answer || !topic){
        return res.status(422).json({error:"please add all the fields"})
    }
    Topics.findOne({name:topic})
    .then(result =>{
        if(!result){
            return res.status(422).json({error:"Topic doesn't exist"})
        }
        const newQues = new Ques({
            question,
            options,
            answer,
            topic:result._id
        })
        newQues.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
    })
    .catch(err=>{
        console.log(err)
    })

})

router.get('/allquestions',(req,res)=>{
    Ques.find()
    .then(ques =>{
        res.json(ques)
    })
    .catch(err =>{
        console.log(err)
    })

})

router.get('/alltopic',(req,res) =>{
    Topics.find()
    .then(topic =>{
        //console.log(topic)
        let groupByCategory = topic.reduce((obj,item)=>{
            obj[item.category] = obj[item.category] || []
            obj[item.category].push(item)
            return obj
        },[]);

        let groups = Object.keys(groupByCategory).map((key) =>{
            return{category:key,item:groupByCategory[key]}
        })
        //console.log(groups)
        res.json(groups)
    })
    .catch(err =>{
        console.log(err)
    })
})

router.post('/topic',(req,res) =>{
    Topics.findById(req.body._id)
    .then(topic =>{
        res.json(topic)
    })
    .catch(err =>{
        console.log(err)
    })
})

router.post('/gameStart',(req,res) => { 
    Ques.find(
        {topic:req.body.topic}
      ).limit(5)
      //.select({"question":1,"options":1})
      .then(quiz =>{
          res.json(quiz)
      })
})

router.post('/result',requireLogin,async (req,res) =>{
    let userscopy = req.body
    let score = 0
    let tally = []
    let db = await Ques.find()
    userscopy.map(ele => {
        tally.push({quesID:ele.ques,marked_choice:ele.ans})
        db.map(e => {
            if(ele.ques == e._id && ele.ans == e.answer ){
                score++
            }
        }) 
    })

        const newQuiz = new Quiz({
            attemptBy:req.user._id,
            score,
            answerTally:tally
        })

        newQuiz.save()
           .then(result =>{
            User.findByIdAndUpdate(req.user._id,{$push:{quiz_attempted:result._id}},(err,doc) =>{})
            res.json(result) 
        })
        .catch(err=>{
            console.log(err)
        })
})

module.exports = router;
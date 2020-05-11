const express = require('express')
const router = express.Router();
const Ques = require("../models/questions")
const Topics = require('../models/Topics')
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
        res.json(topic)
    })
    .catch(err =>{
        console.log(err)
    })
})

router.get('/topic',(req,res) =>{
    Topics.findById(req.body._id)
    .then(topic =>{
        res.json(topic)
    })
    .catch(err =>{
        console.log(err)
    })
})


//Doubt part

router.get('/gameStart',(req,res) => {
    // 
    // console.log(topicID)
    Ques.aggregate([
        {$match: {topic:req.body.topic}}, 
         {$sample: {size: 5}} 
      ])
      .then(quiz =>{
          console.log(quiz)
          res.json(quiz)
      })
})
module.exports = router;
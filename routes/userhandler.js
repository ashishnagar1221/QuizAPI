const express = require('express')
const router = express.Router();
const Ques = require("../models/questions")
const User = require('../models/Users')
const topics = require('../models/Topics')
const requireLogin  = require("../middleware/token")

router.put('/follow',requireLogin,(req,res) =>{
     //console.log(req.body )
    topics.findByIdAndUpdate(req.body.followId,{
        $push:{followedBy:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $push:{topic_followed:req.body.followId}
        },{new:true})
        .then(result =>{
            res.json(result)
        }).catch(err =>{
            return res.json({error:err})
        })
    })
})

router.put('/unfollow',requireLogin,(req,res) =>{
    topics.findByIdAndUpdate(req.body.followId,{
        $pull:{followedBy:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull:{topic_followed:req.body.followId}
        },{new:true})
        .then(result =>{
            res.json(result)
        }).catch(err =>{
            return res.json({error:err})
        })
    })
})

router.get('/followedTopic',requireLogin,(req,res) =>{
    User.findById(req.user._id).select({"topic_followed":1,"_id":0})
    .exec(function (err,result) {
        if (err) 
            return next(err);
        res.send(result);
    });
})



module.exports = router;
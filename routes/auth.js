const express = require('express')
const router = express.Router();
//const moongose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/Users')
const jwt = require('jsonwebtoken')
const {JWT} = require('../keys')
const requireLogin  = require("../middleware/token")

router.get('/protected',requireLogin,(req,res)=>{
    res.send("Hello world")
})

router.post('/signup',(req,res)=>{
    //console.log(req.body)
    const {name,email,password} = req.body 
    if(!email || !password || !name){
        
       return res.status(422).json({error:"please add all the fields 1"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
          return res.status(422).json({error:"user already exists with that email"})
        }
        bcrypt.hash(password,12)
        .then(hashpwd=>{
              const user = new User({
                  name,
                  email,
                  password:hashpwd 
              })
      
              user.save()
              .then(user=>{
                  res.json({message:"saved successfully"})
              })
              .catch(err=>{
                  console.log(err)
              })
        })  
    })
    .catch(err=>{
      console.log(err)
    })
  })

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"please enter email and password"})
    }

    User.findOne({email:email})
    .then((addUser)=>{
        if(!addUser){
            return res.status(422).json({error:"Invalid Email id or password"})
        }
        bcrypt.compare(password,addUser.password)
        .then((match)=>{
            if(match){
                const token = jwt.sign({_id:addUser._id},JWT)
                const {_id,name,email} = addUser
                res.json({token,user:{_id,name,email}})
            }
                //res.json({message:"Sucessfully Signed in"})
            else
                return res.status(422).json({error:"Invalid Email id or password"})
        })
        
    })
})
module.exports = router;
## ISSUE/Bug
### ISSUE RESOLVED
This is link to the doubt section of [Newton School](https://my.newtonschool.co/doubts/question/s64z6jn4aa/) with my Bug.

In questionHandler.js route - '/gameStart', I am trying to get 5 random questions from DB of a certain topic which is being passed from req.body.

I tried : -
```
router.post('/gameStart',(req,res) => { 
    Ques.aggregate([ { $sample: {size: 5}}])
    .then(ques =>{
        res.json(ques)
    })
    .catch(err =>{
        console.log(err)
    })
})
```
I am getting 5 question but topic is not check here .. So i tried this. :-

```
router.post('/gameStart',(req,res) => { 
    Ques.aggregate([ { $sample: {size: 5}},{$match:{topic:req.body.topic}}])
    .then(ques =>{
        res.json(ques)
    })
    .catch(err =>{
        console.log(err)
    })
})
```

Now , I am getting empty array as response.

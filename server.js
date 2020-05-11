const express = require('express');
const mongoose = require('mongoose');
const {URI} = require('./keys')

const app = express();

mongoose.connect(URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        })
          .then(()=> console.log('Conected to Database...'))
          .catch(err =>console.log(err));


app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/questionsHandler'))
app.use(require('./routes/userhandler'))

app.get('/',(req,res)=>{
    res.send("HEllo wORld")
})
app.listen(3600 || process.env.PORT,()=>{
    console.log(`Server started at : ${PORT}`)
})

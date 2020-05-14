const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const {URI} = require('./keys')

const app = express();
app.use(cors())

const PORT = process.env.PORT || 3600;
mongoose.connect(URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false
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
app.listen(PORT,()=>{
    console.log(`Server started`)
})

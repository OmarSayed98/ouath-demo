const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/ouath-test', {useNewUrlParser: true,useUnifiedTopology: true })
    .then(()=>console.log('connected to db'));
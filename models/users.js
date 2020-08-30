const mongoose = require('mongoose');
const schema=mongoose.Schema;
const user=new schema({
    username:String,
    googleid:String,
    thumbnail:String
});
const model=mongoose.model('users',user);
module.exports=model;
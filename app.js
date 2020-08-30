require('dotenv').config();
const express=require('express');
const app=express();
const auth=require('./routes/auth');
const passprotsetup=require('./config/passport-setup');
const db=require('./config/db');
const cookieSession=require('cookie-session');
const passport=require('passport');
const profile=require('./routes/profile');
app.set('view engine','ejs');
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.key]
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/',(req,res)=>{
    res.render('home',{user:req.user});
});
app.use('/auth',auth);
app.use('/profile',profile);
app.listen(3000,()=>{
    console.log('listening to porn 3000');
});
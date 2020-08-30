const passport=require('passport');
const GoogleStratergy=require('passport-google-oauth20').Strategy;
const User=require('../models/users');
passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{
        done(null,user);
    });
});
passport.use( 
    new GoogleStratergy( {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL:'/auth/google/redirect'
    } , (accessToken,refreshToken,profile,done) => {
        console.log(profile);
        User.findOne({googleid:profile.id})
            .then(res=>{
                if(!res){
                    const newuser=new User({
                        username:profile.displayName,
                        googleid:profile.id,
                        thumbnail:profile._json.picture
                    });
                    newuser.save().then((newUser) => {
                        console.log('created new user: ', newUser);
                        done(null, newUser);
                    });
                }
                else{
                    done(null,res);
                }
            });
    }) 
);
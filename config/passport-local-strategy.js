//Using local authentication.
const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

console.log('Local Strategy Running');

//authenticaion using passport and tell passport to use local strategy.
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
    //email and password are automatically passed.       
                       //done is callback function which report back to passport.
    async function(req,email,password,done){
        try{
            const user=await User.findOne({email:email});
            console.log(user);
            if(!user || user.password!=password){
                console.log('Invalid user name or password');
                return done(null,false);
            }
            return done(null,user);
        }catch(err){
            console.log('error',err);
            return done(err);
        }
    }
));

//serielizing the user to decide which key is to be kept in the cookies.
passport.serializeUser(function(user,done){
    console.log('********serilizing*******');
    return done(null,user.id);
});

//deserielizing the user from the key in the session cookies.
passport.deserializeUser(async function(id,done){
   // console.log('*******deserilizing user*********');
    try{
        const user=await User.findById(id);
        return done(null,user);
    }catch(err){
        console.log('error in finding user ---> Passport');
        return done(err);
    }
})

//check if the user is authenticated and it act as a middleware.
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

//whenever any request is comming in this middleware is called and is setting user to locals.
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;

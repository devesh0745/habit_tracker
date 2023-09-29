const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=2000;
require("dotenv").config();
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//Used for Authentication.
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
//used for session cookie
const session=require('express-session');


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assests'));

app.use(expressLayouts);

//Setting up view engine
app.set('view engine','ejs');
app.set('views','./views')


//For Storing session cookies(using mongo store)
app.use(session({
    store:MongoStore.create({
        mongoUrl:process.env.MONGODB,
        autoRemove:'disabled'
    },
    async function(err){
        try{
            console.log('connect-mongo status ok');
        }catch(err){
            console.log('err',err);
        }
    }),
    name:'Habit Tracker',
    secret:"Habit_tracker",
    saveUninitialized:false,
    resave:false,
    cookie:{maxAge:(1000*60*100)}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log('Error in running server',err);
    };
    console.log('Server running on port 2000');
})
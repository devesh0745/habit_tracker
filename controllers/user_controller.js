//Getting all the models.
const User=require('../models/user');
const Habit=require('../models/habit');
const Dates=require('../models/dates');

//Rendering Sign-up page
module.exports.signUp=function(req,res){
    return res.render('sign_up',{
        title:'Habit Tracker'
    })
};

//Rendering Sign-in page
module.exports.signIn=function(req,res){
    return res.render('sign_in',{
        title:'Habit Tracker'
    })
};

//Using function to create a user using local Authentication.
module.exports.createUser=async function(req,res){
    if(req.body.password!=req.body.confirm_password){
        console.log('Password Not Matching');
        return res.redirect('back');
    }
    try{
        const user=await User.findOne({email:req.body.email});
        if(!user){
            //It will create a yser if user not exits
            const user=await User.create(req.body);
            console.log('User created');
            return res.redirect('/users/sign-in');
        }else{
            console.log('Already have an account.....Please sign-in');
            return res.redirect('/users/sign-in');
        }
    }catch(err){
        console.log('error in signing up',err);
        return res.redirect('back');
    }
}

//Direct it to home page when user is login.
module.exports.createSession=async function(req,res){
    console.log('Logged in Successfully');
    return res.redirect('/');
}

//Displaying all the daily habits on home page.
module.exports.dailyHabit=async function(req,res){
    const user=await User.findById(req.user._id).populate({
                                                    path: 'habit',
                                                        populate: { path: 'dates',model:'Dates',select: 'status date' }
                                                        });;
    return res.render('daily_habit',{
        title:'Habit Tracker',
        user:user
    })
}

//Rendering weekly tracker page.
module.exports.weeklyTracker=async function(req,res){
    try{
      const user=await User.findById(req.user._id).populate('habit');
      const habit_tracker=await Habit.findById(req.params.id).populate('dates');
         return res.render('weekly_tracker',{
        title:'Habit Tracker',
        weekly_tracker:habit_tracker
  
    })
    }catch(err){
        console.log('error',err);
        return res.redirect('back')
    }
}

//Deleting the habit.
module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){return next(err); }
        console.log('logging out')
        return res.redirect('/');
    })
}

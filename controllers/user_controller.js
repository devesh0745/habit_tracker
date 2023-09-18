const User=require('../models/user');
const Habit=require('../models/habit');
const Dates=require('../models/dates');

module.exports.signUp=function(req,res){
    return res.render('sign_up',{
        title:'Habit Tracker'
    })
};
module.exports.signIn=function(req,res){
    return res.render('sign_in',{
        title:'Habit Tracker'
    })
};

module.exports.createUser=async function(req,res){
    if(req.body.password!=req.body.confirm_password){
        console.log('Password Not Matching');
        return res.redirect('back');
    }
    try{
        const user=await User.findOne({email:req.body.email});
        if(!user){
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

module.exports.createSession=async function(req,res){
    console.log('Logged in Successfully');
    return res.redirect('/');
}

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

module.exports.weeklyTracker=async function(req,res){
    try{
  //  console.log('working');
    const user=await User.findById(req.user._id).populate('habit');
   // console.log(req.body.user_habit);
    const habit_tracker=await Habit.findById(req.params.id).populate('dates');

   // console.log('weekly trackerrrrrr',req.body.user_habit);
  //  console.log('#############',sevenDaysData);
    return res.render('weekly_tracker',{
        title:'Habit Tracker',
        weekly_tracker:habit_tracker
     //   weekly_tracker:req.body.user_habit

    })
    }catch(err){
        console.log('error',err);
        return res.redirect('back')
    }
}

module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){return next(err); }
        console.log('logging out')
        return res.redirect('/');
    })
}

const User=require('../models/user');

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
    return res.render('daily_habit',{
        title:'Habit Tracker'
    })
}

module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){return next(err); }
        console.log('logging out')
        return res.redirect('/');
    })
}

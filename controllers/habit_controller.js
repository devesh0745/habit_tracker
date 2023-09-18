const User=require('../models/user');
const Habit=require('../models/habit');
const Dates=require('../models/dates');


module.exports.createHabit=async function(req,res){
    try{
        const user=await User.findById(req.user._id).populate('habit');
       // console.log('****:',user.habit);
        const habit=await Habit.find({user:req.user._id});
        let habit_name=req.body.habit;
        let obj=habit.find(o => o.habit_name.toLowerCase()==habit_name.toLowerCase());
        if(obj){
            console.log('Habit already exist.....create new habit');
            return res.redirect('back');
        }else{
            const habit=await Habit.create({
                habit_name:req.body.habit,
                user:req.user._id    
            })
           // let new_date=new Date().toJSON().slice(0,10).replace(/-/g,'/');
          //  habit.dates.push(new_date);
          //  habit.save();
            user.habit.push(habit);
            user.save();
            return res.redirect('back')
        }

      
    }catch(err){
        console.log('error in creating habit',err);
        return res.redirect('back');
    }
}

module.exports.updateStatusDaily=async function(req,res){
    try{
    const habit=await Habit.findById(req.params.id).populate('dates');
    const dates=await Dates.find({habit:habit._id});
    let updatingStatusDate=habit.createdAt.toDateString();
    console.log('******date:',updatingStatusDate);
    let obj=dates.find(o => o.date.toDateString()==updatingStatusDate);
    if(obj){
        const date=await Dates.findById(obj._id);
        date.status=req.body.status;
        date.save();
        return res.redirect('back');
        }else{
            if(req.body.status){
            const date=await Dates.create({
                date:habit.createdAt,
                habit:habit._id,
                status:req.body.status
                })
                habit.dates.push(date);
                habit.save();
                return res.redirect('back');
            }else{
                const date=await Dates.create({
                    date:habit.createdAt,
                    habit:habit._id,
                })
                habit.dates.push(date);
                habit.save();
                return res.redirect('back');
            }

        }

    }catch(err){
        console.log('status cannot be updated',err);
    }
}

module.exports.updateStatusWeekly=async function(req,res){
        try{
            const habit=await Habit.findById(req.params.id).populate('dates');
          //  console.log(habit);
            const dates=await Dates.find({habit:habit._id});
            let updatingStatusDate=req.body.day
            console.log(updatingStatusDate);
            let obj=dates.find(o => o.date.toDateString()==updatingStatusDate);
        
            if(obj){
                const date=await Dates.findById(obj._id);
                date.status=req.body.status
                date.save();
             //   console.log("running.....")
                return res.redirect('back');
            }else{
                if(req.body.status){
                    const date=await Dates.create({
                        date:req.body.day,
                        status:req.body.status,
                        habit:habit._id
                    })
                    habit.dates.push(date);
                    habit.save();
                    return res.redirect('back');
                }else{
                    const date=await Dates.create({
                        date:req.body.day,
                        habit:habit._id
                    })
                    habit.dates.push(date);
                    habit.save();
                    return res.redirect('back');
                }
            }
    }catch(err){
        console.log('error in updating status weekly',err);
        return res.redirect('back');
    }
}

module.exports.deleteHabit=async function(req,res){
    await Dates.deleteMany({habit:req.params.id})
    await Habit.findByIdAndDelete(req.params.id);
    const pullHabit=await User.findByIdAndUpdate(req.user.id,{$pull:{habit:req.params.id}});
    return res.redirect('/users/daily-habit');
}

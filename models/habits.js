const mongoose=require('mongoose');

const habitSchema=new mongoose.Schema({
    habit_title:{
        type:String,
        required:true   
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    habit_desc:{
        type:String,
    }
},{
    timestamps:true
});

const Habit=mongoose.model('Habit',habitSchema);

module.exports=Habit
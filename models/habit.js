const mongoose=require('mongoose');

const habitSchema=new mongoose.Schema({
    habit_name:{
        type:String,
        required:true   
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dates:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Dates'    
    }]
},{
    timestamps:true
});

const Habit=mongoose.model('Habit',habitSchema);

module.exports=Habit;
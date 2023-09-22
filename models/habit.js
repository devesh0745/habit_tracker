//Creating habit schema.
const mongoose=require('mongoose');

const habitSchema=new mongoose.Schema({
    habit_name:{
        type:String,
        required:true   
    },
    //Store details of the user.
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //Array of dates that have status of the respective dates.
    dates:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Dates'    
    }]
},{
    timestamps:true
});

const Habit=mongoose.model('Habit',habitSchema);

module.exports=Habit;
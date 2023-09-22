//Creating user schema to store users details.
const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    //It will have the list of all the habits user has created
    habit:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Habit'
    }]
},{
    timestamps:true
});

const User=mongoose.model('User',userSchema);
module.exports=User;
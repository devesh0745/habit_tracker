const mongoose=require('mongoose');

const dateSchema=new mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:['Done','Not Done','None'],
        default:'None'
    },
    habit:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Habit'
    }
},{
    timestamps:true
});

const Dates=mongoose.model('Dates',dateSchema);

module.exports=Dates;
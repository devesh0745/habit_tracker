const mongoose=require('mongoose');

mongoose.connect('mongodb://0.0.0.0/habitTracker_development');

const db=mongoose.connection;
db.on('error',console.error.bind(console,"Error in connecting to MongoDB"));

db.once('open',function(){
    console.log('connected to Database::MongoDB');
})
module.exports=db;
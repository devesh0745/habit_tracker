//Setting up the database
const mongoose=require('mongoose');
require("dotenv").config();
//console.log('')

mongoose.connect(process.env.MONGODB);

const db=mongoose.connection;
db.on('error',console.error.bind(console,"Error in connecting to MongoDB"));

db.once('open',function(){
    console.log('connected to Database::MongoDB');
})
module.exports=db;
const mongoose = require('mongoose');
require('dotenv').config()
console.log("Value",process.env.USER_NAME)
mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.PASS_WORD}@cluster0.h1s3r.mongodb.net/Main?retryWrites=true&w=majority`, {useNewUrlParser: true,useUnifiedTopology: true});
let Course= new mongoose.Schema({
    Course_Name: String,
    Course_ID: Number,
    Course_Duration:Number,
    Course_Fee:Number,
   
  },{timestamps:true}
  )
  
module.exports=mongoose.model('Course', Course)
  
const mongoose = require("mongoose");


const quotesSchema = new mongoose.Schema({
    num: Number, 
    quote:String,
    author:String 
  });
  
module.exports = mongoose.model("Quote", quotesSchema);
  
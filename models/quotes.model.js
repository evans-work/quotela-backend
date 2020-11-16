const { Schema, model } = require("mongoose");

const quoteSchema = new Schema({
   quoteText:String,
   by:String,
   backgroundColor:String,
   textColor:String,
   likes:Number,
   userId:String,
   created:
   {
      type:Date,
      default:Date.now
   },
   updated:
   {
      type:Date,
      default:Date.now
   },
})

module.exports = model("Quote",quoteSchema)
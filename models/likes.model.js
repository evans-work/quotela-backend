const { Schema , model } = require('mongoose')

likesSchema = new Schema({
   userId:
   {
      type:String,
      required:true
   },
   quoteId:
   {
      type:String,
      required:true
   },
   created:
   {
      type:Date,
      default:Date.now
   }
})


module.exports = model('Likes',likesSchema)
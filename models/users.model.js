const {Schema,model} = require('mongoose')

const usersSchema = new Schema({
   firstName:
   {
      type:String,
      required:true,
      max:50

   },
   lastName:
   {
      type:String,
      required:true,
      max:50
   },
   email:
   {
      type:String,
      required:true,
      min:6,
      max:255
   },
   password:
   {
      type:String,
      required:true,
      max:1024,
      min:6
   },
   profilePicture:
   {
      type:String,
      required:false
   },
   created:
   {
      type:Date,
      default:Date.now
   },
   lastLogin:
   {
      type:Date,
      default:Date.now
   }
})


module.exports = model('Users',usersSchema)
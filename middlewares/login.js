const Users = require('../models/users.model')
const bcrypt = require('bcryptjs')

module.exports = async (req,res,next) =>{

   try {
      user = await Users.findOne({'email':req.body.email})
      if(! user) {
         res.status(400)
         res.json({status:false,data: 'user with that email does not exits please register or try again'})
         return
      }
      req.body.id = user._id
      req.body.firstName = user.firstName
      req.body.lastName = user.lastName
      isPasswordValid = await  bcrypt.compare(req.body.password,user.password)
      if(!isPasswordValid){
         console.log('password valid')
         res.status(400)
         res.json({status:false,data:'invalid password'})
         return
      }
      next()
   } catch (error) {
      res.status(400)
      res.json({status:false,data:'unidentified error while logging you in'})
      return
   }
}
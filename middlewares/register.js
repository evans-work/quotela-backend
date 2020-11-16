const usersModel = require('../models/users.model')

mongoose = require('mongoose')
const Users = require('../models/users.model')
const bcrypt = require('bcryptjs')
module.exports = async(req,res,next) =>{
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(req.body.password,salt)
   
   req.body.password = hashedPassword
   req.body.confirmPassword = null

   try {
      user = new Users(req.body)
      createdUser = await user.save()
      req.body.id = createdUser._id
      req.body.firstName = createdUser.firstName
      req.body.lastName = createdUser.lastName
      next()
   } catch (error) {
      res.status(400)
      res.json({status:false,data:'unidentified error while registering you please try again'})
      return
   }
}
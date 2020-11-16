const Joi = require('joi')
const usersModel = require('../models/users.model')
const Users = require('../models/users.model')

module.exports = async (req,res,next) =>{
   schema = Joi.object({
      firstName: 
         Joi.string()
         .required()
         .max(30),
      lastName:
         Joi.string()
         .required()
         .max(30),
      email:
         Joi.string()
         .email()
         .required(),
      password:
         Joi.string()
         .min(6)
         .required(),
      confirmPassword:
         Joi.ref('password')
      
   })

   const {error,value} = await schema.validate(req.body)

   if(error){
      res.status(400)
      res.json({status:false,data: error.details[0].message})
      return
   }
   userAlreadyExists = await Users.findOne({'email':req.body.email})
   if(userAlreadyExists) {
      res.status(400)
      res.json({status:false,data:'a user with this email already exists please login'})
      return
   }
   next()
}
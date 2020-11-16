Joi = require('joi')
module.exports = async (req,res,next) =>{
   schema = Joi.object({
      email:
         Joi.string()
         .email()
         .required(),
      password:
         Joi.string()
         .min(6)
         .required()    
   })

   const {error,value} = schema.validate(req.body)

   if(error){
      res.status(400)
      res.json({status:false,data: error.details[0].message})
      return
   }
   

   next()
}
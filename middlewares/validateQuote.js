const Joi = require("joi")

module.exports = async (req,res,next) =>{
   schema = Joi.object({
      quoteText:
         Joi.string()
         .required()
         .max(200),
      by: 
         Joi.string()
         .required()
         .max(50),
      userId:Joi.string(),
      likes:Joi.number(),
      verified:Joi.boolean(),
      textColor:
         Joi.string()
         .required()
         .max(30),
         backgroundColor:
         Joi.string()
         .required()
         .max(30)

   })

   const {value,error} = await schema.validate(req.body)
   if(error){
      res.status(400)
      res.json({status:false,data:error.details[0].message})
      return
   }
   next()
}
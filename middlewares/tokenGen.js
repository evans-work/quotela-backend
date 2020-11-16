const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = async (req,res,next) =>{
   try {
      token = await jwt.sign({'id':req.body.id},process.env.SECRET)
      req.body.token = token     
      next()
   } catch (error) {
      res.status(400)
      res.json({status:false,data: 'error generating your token'})
   }
  
}
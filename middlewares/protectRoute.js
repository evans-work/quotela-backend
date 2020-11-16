const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = async (req,res,next) =>{
   const token = req.header('token')
   if (!token){
      res.status(403)
      res.json({status:400,data:'token required '})
      return
   }
   try {
      const verified = jwt.verify(token,process.env.SECRET)
      req.body.verified = true
      req.body.userId = verified.id
   } catch (error) {
      res.status(400)
      res.json({status:false,data:'invalid token'})
      return
   }
   next()
}
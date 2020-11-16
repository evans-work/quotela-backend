const express = require('express')
const mongooser = require('mongoose')
const login = require('../middlewares/login')
const router = express.Router()
const loginValidator = require('../middlewares/loginValidator')
const register = require('../middlewares/register')
const registerValidator = require('../middlewares/registerValidator')
const tokenGen = require('../middlewares/tokenGen')

router.post('/login',loginValidator,login,tokenGen, async (req,res) =>{
  res.status(200)
 
   res.json({status:true,data:{
      id:req.body.id,
      firstName:req.body.firstName,
      lastName : req.body.lastName,
      token:req.body.token
   }})

})

router.post('/register',registerValidator,register,tokenGen, (req,res) =>{
   res.status(200)
   res.json({status:true,data:{
      id:req.body.id,
      firstName:req.body.firstName,
      lastName : req.body.lastName,
      token:req.body.token
   }})
})

module.exports = router
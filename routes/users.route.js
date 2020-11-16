const express = require('express')
const router = express.Router()
const Users  = require('../models/users.model')
router.get('/:id', async(req,res) =>{
   try {
      user = await Users.findOne({'_id':req.params.id})
      res.status(200)
      user.password = 'hidden'
      res.json({status:true,data:user})
   } catch (error) {
      res.status(200)
      res.json({status:true,data:'error retrieving the user'})
   }
   
})

module.exports  = router
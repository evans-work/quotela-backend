const { response } = require('express')
const express = require('express')
const Likes = require('../models/likes.model')
const router = express.Router()
const mongoose = require('mongoose')
const protectRoute = require('../middlewares/protectRoute')
const Quote = require('../models/quotes.model')
const { updateOne } = require('../models/likes.model')
const verifyOwnership = require('../middlewares/verifyOwnership')
const validateQuote = require('../middlewares/validateQuote')


router.get('/',(req,res) => {
  Quote.find({}).sort({'created':-1})
  .exec((err,quotes) =>{
    if(err){
      res.status(500)
      res.json('error getting quotes')
    }else{
      res.status(200)
      res.json(quotes)
    }
    
  })
})

router.post('/',protectRoute,validateQuote, (req,res) => {
 
 
  let newQuote = req.body

  newQuote.likes= 0
  newQuote.userId = req.body.userId

  let quote = new Quote(newQuote)

  quote.save((error,createdQuote)=>{
    if(error){
      res.status(500)
      res.json({status:false,data:'error saving the quote'})
      return
    }
    res.status(200)
    res.json({status:true,data:createdQuote})
  })

})


router.put('/:quoteId',protectRoute,verifyOwnership,validateQuote,(req,res) =>{
  const id = req.params.quoteId
  const quoteText = req.body.quoteText
  const by = req.body.by
  const backgroundColor = req.body.backgroundColor
  const textColor = req.body.textColor
  Quote.updateOne({'_id':id},
  {
    "quoteText":quoteText,
    "by":by,
    "backgroundColor":backgroundColor,
    "textColor":textColor
  })
  .exec((err,quote) =>{
    if(err){
      res.status(400)
      res.json({status:false,data:'error updating quote'})
      
    }else{
      res.status(200)
      res.json({status:true,data:quote})
    }
  })
})

router.delete('/:id',protectRoute, (req,res)=>{
  Quote.deleteOne({'_id':req.params.id})
  .exec((err,data) =>{
    if(err){
      res.status(400)
      res.json(err)
    }else{
      res.status(200)
      res.json(data)
    }
  })
})



router.put('/likes',protectRoute,async(req,res) =>{

  try {
    //check if likes exist
    const existingLike = await Likes.findOne({'userId':req.body.userId,'quoteId':req.body.quoteId})
    if(existingLike){
      res.status(400)
      res.json('like already exists')
      return
    }
    const like = new Likes({
      'quoteId':req.body.quoteId,
      'userId':req.body.userId
    })

    like.save((error,createdLike) =>{
      if(error) {
        console.log('error creating like')
        res.status(400)
        res.json(error)
        return
      }
    })

    try {
      updatedQuote = await Quote.updateOne({_id:req.body.quoteId},{$inc:{'likes':1}})
      res.status(200)
      res.json('like created')
      return

    }catch (error) {
      res.status(500)
      res.json(error)
      return
    }
  
  } catch (error) {
    res.status(400)
    res.json('unable to update likes')
    return
  }
  
})

router.delete('/likes/:quoteId',protectRoute, async (req,res) =>{
  const userId = req.body.userId
  const quoteId = req.params.quoteId
  try {
    const deleteResults = await Likes.deleteOne({'userId':userId,'quoteId':quoteId})
    try {
      const updateOne = await Quote.updateOne({'_id':quoteId},{$inc:{'likes':-1}})
      res.status(200)
      res.json(deleteResults)
      return

    } catch (error) {
      res.status(400)
      res.json('unable to update likes')
      return
    }
  } catch (error) {
    res.status(400)
    res.json(error)
    return
  }
  
})


router.get('/likes/:quoteId',protectRoute,async (req,res) =>{
  try {
    const like = await Likes.findOne({'userId':req.body.userId,'quoteId':req.params.quoteId})
    if(like)
    {
      res.status(200)
      res.json({status:true, data:true})
      return
    }else{
      res.status(200)
      res.json({status:false, data:like})
      return
    }
    
  } catch (error) {
    res.status(400)
    res.json({status:false,error:'could not retrieve your like'})
  }
  

})

router.get('/:quoteId',(req,res) =>{

  id = req.params.quoteId
  if(id){
    Quote.findOne({_id:id})
    .exec((err,quote) =>{
      if(err){
        res.status(400)
        res.json({status:false,data:'could not find the quote'})
      }else{
        res.status(200)
        res.json({status:true,data:quote})
      }
    })
  }else{
    res.status('400')
    res.json({status:false,data:'unknown quote id'})
  }
})
module.exports = router
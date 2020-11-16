const Quotes = require("../models/quotes.model")

module.exports = async (req,res,next)=>{
   let sentUserId =null
   if(req.body.userId){
      sentUserId = req.body.userId
   }else if(req.params.userId){
      sentUserId = req.params.userId
   }
   else{
      res.status(400)
      res.json({status:false,data:'user id is required'})
      return
   }
   let sentQuoteId = null
   if(req.body.quoteId  )
   {
      sentQuoteId = req.body.quoteId
   }else if(req.params.quoteId ){
      sentQuoteId = req.params.quoteId
   }else{
      res.status(400)
      res.json({status:false,data:'quote id is required'})
      return
   }
   try {
      quote = await Quotes.findOne({'_id':sentQuoteId})
      if (quote){
         if(quote.userId != sentUserId)
         {
            res.status(400)
            res.json({status:false,data:'you can only modify a quote you created'})
            return
         }
         next()
         
      }else{
         res.status(400)
         res.json({status:false,data:'quote not found'})
         return
      }
   } catch (error) {
      res.status(400)
      res.json({status:false,data:'could not find the quote'})
      return
   }
   

   
}
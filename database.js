const { connection } = require('mongoose');
require('dotenv').config()
mongoose = require('mongoose')
function db()
{
  
   const options = 
  {
      useNewUrlParser:true,
      useUnifiedTopology: true,
      useCreateIndex:true
   }
   mongoose.connect(process.env.DB_URI,options)
   mongoose.connection.on('connected',()=>{
      console.log('database connected')
   });

}

module.exports = db


const express = require('express')
const app = express()
require('dotenv').config()
require('./database')()
app.use(express.json())

//routers
const authRouter = require('./routes/authentication.route')
app.use('/auth',authRouter)
const quotesRouter  = require('./routes/quotes.route')
app.use('/quotes',quotesRouter)

const usersRouter = require('./routes/users.route')
app.use('/users',usersRouter)

app.get('/',(req,res) =>{
   res.send('welcome to quotela api')
})

app.listen(process.env.PORT|5000,()=>{
   console.log(`server running on port ${process.env.PORT|5000}`)
})
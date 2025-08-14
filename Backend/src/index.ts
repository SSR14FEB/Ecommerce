import app from './app'
import dbConnection from './database/index'

import dotenv from 'dotenv'
dotenv.config({
   path:'./.env'
})

app.use('/',(req,res)=>{
    res.send("<h1>hello backend </h1>")
})

dbConnection()
.then(()=>{
    app.listen(`${process.env.PORT}`,()=>{
        console.log(`Express app is listing at ${process.env.PORT}`)
    })
})
.catch(()=>{
    console.log(`Got an error while listening on ${process.env.PORT}` )
})
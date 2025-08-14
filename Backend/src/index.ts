import express from 'express'
const app = express();
 app.get('/',(req,res)=>{
    res.json({
        "status":"200",
        "massage":"backend setup is completed"
    })
})

app.listen(3000,()=>{
    console.log("hello backend")
})
console.log("testing backend setup");

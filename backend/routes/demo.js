import express from 'express'

const router = express.Router();

router.get('/demo' , (req , res) =>{
    console.log("home page");
    res.send("demo page is rendering on internet")
    
})

export {router}
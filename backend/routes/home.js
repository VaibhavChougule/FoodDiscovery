import express from 'express'

const router = express.Router();

router.get('/' , (req , res) =>{
    console.log("home page");
    res.send("home page is rendering on internet")
    
})

export {router}
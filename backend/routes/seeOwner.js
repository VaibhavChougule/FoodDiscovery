import express from 'express'
import { getAdmin, id } from '../services/adminAuth.js';

const router = express.Router()

router.post("/api/seeOwner" , (req , res) =>{
    console.log(req.body);
    console.log(req.cookies)
    const token = req.body.ck;
    const realtoken = token.split("=")[1];
    let st = getAdmin(realtoken)
    if(st == true){
        console.log("owner verification" , st);
        console.log(id);
    }
    console.log("hmmm",req.cookies)
    res.cookie('hello' , "jslal")
})

export {router}
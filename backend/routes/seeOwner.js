import express from 'express'
import { getAdmin, id } from '../services/adminAuth.js';
import { Restorent } from '../models/Restorent.models.js'

const router = express.Router()

router.post("/api/seeOwner" , async(req , res) =>{
    console.log(req.body);
    console.log(req.cookies)
    const token = req.body.ck;
    const realtoken = token.split("=")[1];
    let st = getAdmin(realtoken)
    if(st == true){
        console.log("owner verification" , st);
        console.log(id);
        const restoDetails = await Restorent.findOne({RestoId:id})
        if(restoDetails == null){
            res.status(400).send("Could not find id")
        }
        else{
            console.log(restoDetails);
            

            res.status(200).json(restoDetails)
            return;
        }
    }
    console.log("hmmm",req.cookies)
    res.status(400).json({"message":"Please Login Again"})
})

export {router}
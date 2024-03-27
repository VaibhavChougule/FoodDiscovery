import express from 'express'
//import { Restorent } from '../models/Restorent.models.js'
import { getAdmin, setAdmin } from '../services/adminAuth.js'
//import { verifyOwner } from '../services/ownerVerify.js'

const router = express.Router()

router.get('/api/verifyLogin' , async (req , res)=>{
    const token = req.body;
    let verificationStatus = await getAdmin(token);
    if(verificationStatus == true){
        res.send({status:true});
    }
    else{
        res.send({status:false})
    }
}) 

export {router}
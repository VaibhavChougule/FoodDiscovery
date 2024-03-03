import express from 'express'
import { Restorent } from '../models/Restorent.models.js';
import { pendingReq } from '../models/pendingReq.models.js';

const router = express.Router();

router.post('/api/verifiedResto' , async (req , res) =>{
    try{

    
    console.log("aceepted resto details" , req.body);
    const h ={
        ...req.body
    }
    console.log("verifying " , h);
    const newRestorent = new Restorent({
        ...req.body
    })
    const st = await newRestorent.save();
    const deleteRestoreqRes = await pendingReq.deleteOne({OwnerContact:req.body.OwnerContact});
    console.log("deleted" , deleteRestoreqRes);
    console.log(st);
    res.send(st);
}
catch{
    console.log("yar kuch to galat huva hai")
}
})


router.post('/api/rejectedResto' , async (req , res) =>{
    try{

    
    console.log("rejected resto id "  , req.body);
    const deleteRestoreqRes = await pendingReq.deleteOne({OwnerContact:req.body.RestoId});
    console.log(deleteRestoreqRes);
    res.send(deleteRestoreqRes)
}
catch{
    console.log("reject nahi kr sakate");
}
})

export {router}
import express from 'express'
import { getAdmin } from '../services/adminAuth.js';

const router = express.Router()

router.post('/api/verifyAdmin' , async (req , res) =>{
    const ck = req.body
    console.log("cookie is",ck.ck);
    const s = await getAdmin(req.body.ck);
    console.log("getAdmin result" , s)
    if(s == true){
        console.log("status succesful hai")
        res.send({status:"success"})
    }
    else{
        
        console.log("status error");
        res.send({status:"fail"})
    }

})

export {router}
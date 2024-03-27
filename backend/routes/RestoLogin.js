import express from 'express'
import { Restorent } from '../models/Restorent.models.js'
import { getAdmin, setAdmin } from '../services/adminAuth.js'
import { verifyOwner } from '../services/ownerVerify.js'

const router = express.Router()

router.post('/api/RestoLogin' , async (req , res) =>{
    console.log("user login req" , req.body)
    const restoDbres = await Restorent.findOne({RestoId:req.body.restoId , RestoPassword:req.body.password})
    console.log(restoDbres)
    if(restoDbres == null){
        res.send({verify:false})
    }
    else{

        const token = await setAdmin(req.body.restoId);

        res.send({verify:true , token:token})
    }
    //Resto Login logic here
})

router.get('/api/verifyLogin' , async (req , res)=>{
    const token = req.cookies.owner;
    console.log(req.cookies.owner)
    let verificationStatus = await getAdmin(token);
    console.log("stauts",verificationStatus)
    if(verificationStatus == true){
        console.log("if is running")
        res.send({status:true});
    }
    else{
        res.send({status:verificationStatus})
    }
}) 

export {router}
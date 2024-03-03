import express from 'express'
import mongoose from 'mongoose';
import { admin } from '../models/admin.models.js';
import { setAdmin } from '../services/adminAuth.js';

const router = express.Router();

//const admin = mongoose.model('admin' , admin);

router.post('/api/AdminLogin' , async(req , res) =>{

const token = await setAdmin(req.body.username);
 console.log("token" ,token)

 if(token){

    console.log(req.body);
 const adminData = await admin.findOne({adminId:req.body.username , password:req.body.password});
 console.log('db data' , adminData);
 //console.log("admin data" , adminData[0]['adminId']);
 
 if(adminData){

     res.send({verification:true , token:token})
 }
 else{
    res.send({verification:false})
 }



 }


})

router.get('/api/AdminLogin' , async(req , res) =>{
    const token = req.body.token
    const verify = await getAdmin(token);
    if(verify){
        res.send()
    }
    else{

    }
})

export {router}
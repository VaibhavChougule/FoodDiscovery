import express from 'express'
import { pendingReq } from '../models/pendingReq.models.js';

const router = express.Router();

router.get('/api/registerResto' , async (req , res) =>{
    console.log("check cookie",  req.body)
    const data = await pendingReq.find({});
    console.log(data)
    res.json(data)
    
})


//handling POST request

router.post('/api/registerResto' ,  (req , res) =>{
    console.log("req" , req.body)

    //creating a collection and saving into database on request
    const data = req.body
    const newPendingReq = new pendingReq({
        RestoName:data.restoName,
        RestoAddress:data.restoAddress,
        RestoOwner:data.restoOwner,
        OwnerContact:data.ownerContact,
        RestoPassword:data.restoPassword
    })

    newPendingReq.save()
    .then((savedData) =>{
        console.log(savedData)
        console.log("saved into db")
    })
    .catch((err) =>{
        console.log("error while saving into db" , err)
    })


    res.send("done")
})


export {router}
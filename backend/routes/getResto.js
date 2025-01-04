import express from 'express'
import { RestoMenu } from '../models/menuCard.models.js'

const router = express.Router()

router.get('/api/getResto' , async (req , res) =>{
    const restoDetails = await RestoMenu.find({})
    console.log(restoDetails);
    const detail = [
        
    ]
    restoDetails.map((val , ind) =>{
        console.log("val" , val.RestoName)
        let respond = {
        name:val.RestoName,
        address:val.RestoAddress,
        menu:val.menus,
        LastUpdateDate:val.updatedAt.toLocaleDateString().toString(),
        LastUpdateTime:val.updatedAt.toLocaleTimeString()
    }
        detail.push(respond);
    })
    
    res.send(detail);
})

export {router}
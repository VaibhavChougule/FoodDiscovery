import express from 'express'
import { RestoMenu } from '../models/menuCard.models.js';
import { Restorent } from '../models/Restorent.models.js';
import { verifyOwner } from '../services/ownerVerify.js';

const router = express.Router();

router.post('/api/menuCard' , async (req , res)=>{
    console.log(req.body);
    
    const menuItems = req.body.menuCard;
    console.log(menuItems);

    let rawcookie = req.body.ck;
    let cookie = rawcookie.split('=')[1];
    console.log("cookie is" , cookie);
    let detailsofOwner;
    try{

        detailsofOwner = await verifyOwner(cookie);
        console.log(detailsofOwner)
    }
    catch{
        console.log('owner not verified')
        res.send({st:'owner not verified'})
        return;
    }


   
    const resForObj = await Restorent.findOne({RestoId:detailsofOwner.message});
    console.log("onwer object id",resForObj);
    
// if menu card is already present then update it
    const isAlreadyPresent = await RestoMenu.findOne({ownerRestoId:resForObj});
    if(isAlreadyPresent != null){
    console.log(isAlreadyPresent);
    console.log("already preseny");
    const up = await RestoMenu.updateOne({ownerRestoId:resForObj} , {$set:{menus:menuItems}})
    res.send('updated')
    return;
}


//if menucard is not present create
    const newRestoMenu = new RestoMenu({
        menus:menuItems,
        ownerRestoId:resForObj
    })
    
    const isMenuSaved = await newRestoMenu.save();
    console.log("error yaha hai" , isMenuSaved);
    //if(req.body.data)
    res.send("seccess")
})


export {router}
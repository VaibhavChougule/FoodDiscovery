import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
    menus:[String],
    ownerRestoId:{
        type:String,
        required:true,
        unique:true
        
    }
})

export const RestoMenu = mongoose.model('RestoMenu' , MenuSchema);

 
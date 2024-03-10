import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
    menus:[String],
    ownerRestoId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true
        
    }
} , {timestamps:true})

export const RestoMenu = mongoose.model('RestoMenu' , MenuSchema);

 
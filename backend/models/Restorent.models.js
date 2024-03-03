import mongoose from "mongoose";

const RestoScheme = new mongoose.Schema({
    RestoName:{
        type:String,
        required:true,
        unique:true
    },
    RestoId:{
        type:String,
        unique:true,
        required:true
    },
    
   
    RestoAddress:{
        type:String,
        required:true,
    },
    RestoOwner:{
        type:String,
        required:true
        
    },
    OwnerContact:{
        type:String,
        required:true,
        unique:true
    },
    RestoPassword:{
        type:String,
        required:true
    }
} , {timestamps:true})

export const Restorent = mongoose.model('Restorent' , RestoScheme);



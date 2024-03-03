import mongoose from "mongoose";

const pendingReqSchema =new mongoose.Schema({
    RestoName:{
        type:String,
        required:true,
        unique:true
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

} , {timestamps:true});

export const pendingReq = mongoose.model("pendingReq" , pendingReqSchema);


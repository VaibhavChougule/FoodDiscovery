import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

export const admin = mongoose.model('admin' , AdminSchema);

 
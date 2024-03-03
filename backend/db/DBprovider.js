import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

async function dbConnect(){
    const connection = await mongoose.connect(`${process.env.MONGODB_URL}/FoodDiscovery`)
    //console.log("connection " , connection)
}

export default dbConnect
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const Url = process.env.BACKEND_URL
export const connectDb = async ()=>{
    try{
        await mongoose.connect(Url as string) 
        console.log("connected")
    }catch(e){
        console.log(e)
    }
}
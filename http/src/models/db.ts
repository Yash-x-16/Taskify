import mongoose from "mongoose";
import { DB_URL } from "../utils/envExports.js"; 

export const connectDb = async()=>{
    try {
        const connection = await mongoose.connect(DB_URL as string) ; 
        return connection.connection.host ; 
    } catch (error) {
        console.log("error in connecting to db",error) ; 
    }
}
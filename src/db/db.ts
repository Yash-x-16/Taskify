import mongoose from "mongoose"; 
import type { tryCast } from "typescript/unstable/ast";


export const connectDb = async(url:string)=>{
    try {
        const connection = await mongoose.connect(url) 
        const host  = connection.connection.host ; 
        if(host){
            return host
        }else{
            return "no host found"
        }

    } catch (error) {
        console.log("error in the mongoDb connection ",error) ; 
    }
}
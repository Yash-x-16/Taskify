import mongoose from "mongoose"; 



export const connectDb = async(url:string)=>{
    try {
        console.log("connection url is ",url)
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
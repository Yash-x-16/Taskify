import mongoose from "mongoose"; 

export const connectDb = async(dbUrl :String)=>{
    try {
        const connection =  await mongoose.connect(dbUrl as string) 
        return connection.connection.host 
    } catch (error) {
        console.log("error in connecting db : ",error)
    }
}
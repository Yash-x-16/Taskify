import mongoose from "mongoose"; 

 async function main (){ 
    try {
        
   const connection =  await mongoose.connect(process.env.DB_URL as string ) 
   console.log(connection.connection.host)

    } catch (error) {
        console.log("error while connecting to the db : ",error)     
    } 
} 

export default main  ; 
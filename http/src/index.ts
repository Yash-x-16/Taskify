import express from "express"  
import authRouter from "./routes/authRoutes.js";
import { connectDb } from "./db/db.js"; 
import { DB_url , port } from "./utils/envExports.js"; 


const app = express() 

app.use(express.json()) ;  

app.use("/app/auth",authRouter) ;

app.listen(port ,async ()=>{

    const host =  await connectDb(DB_url as string)
    console.log(`app is listening on ${port}`) 
    console.log(`db is connected with ${host}`)  

})
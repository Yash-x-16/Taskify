import express from "express" ; 
import {HTTP_PORT} from "./utils/envExports.js" 
import { authRoutes } from "./routes/authRoutes.js";
import { connectDb } from "./models/db.js";
const app = express(); 

app.use(express.json()) ; 

app.use('/api/auth',authRoutes) ; 

app.listen(HTTP_PORT,async ()=>{
    console.log(`server is listening on port ${HTTP_PORT}`) ;  
    const host = await connectDb() ; 
    console.log(`db is connected ${host}`)
})
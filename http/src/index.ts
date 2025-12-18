import express from "express" ; 
import {HTTP_PORT} from "./utils/envExports.js" 
import { authRoutes } from "./routes/authRoutes.js";
import { connectDb } from "./models/db.js";
import { todoRoutes } from "./routes/todoRoutes.js";
import cors from "cors"
const app = express(); 

app.use(express.json()) ; 
app.use(cors()) ; 
app.use('/api/auth',authRoutes) ; 
app.use("/api/todo",todoRoutes) ; 

app.listen(HTTP_PORT,async ()=>{
    console.log(`server is listening on port ${HTTP_PORT}`) ;  
    const host = await connectDb() ; 
    console.log(`db is connected ${host}`)
})
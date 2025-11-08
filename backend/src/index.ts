console.log("radhe radhe :)") ;  
import express from "express"  
import dotenv from "dotenv"  
import authRoutes from "./Routes/authRoutes.js"
import todoRoutes from "./Routes/todoROutes.js"
import main from "./db/db.js"
dotenv.config() 

const app = express() ;  

app.use(express.json()) 

app.use('/api/auth',authRoutes)
app.use('/api/todo',todoRoutes)

app.listen(process.env.PORT,async ()=>{
    console.log("port is running on port ",process.env.PORT) ; 
    await main() ; 
})
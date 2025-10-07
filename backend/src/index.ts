import express from "express" 
import authRoutes from "./Routes/authRoutes.js"
import todoRoutes from "./Routes/todoRoutes.js"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
const app = express() 


app.use(express.json()) 
app.use(cors())
app.use('/api/auth',authRoutes);
app.use('/api/todo',todoRoutes);

const Port = process.env.Port

app.listen(Port,()=>{
    console.log(`server is listening ! on port ${Port}!`)
})


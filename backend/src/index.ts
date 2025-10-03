import express from "express" 
import authRoutes from "./Routes/authRoutes.js"

const app = express() 


app.use(express.json())
app.use('/api/auth',authRoutes);


app.listen(3000,()=>{
    console.log("server is listening !!")
})


import express from "express"  
import authRouter from "./routes/authRoutes.js";
const app = express() 

app.use(express.json()) ;  

app.use("/app/auth",authRouter) ;

app.listen(3000,()=>{console.log("app is listening on port")})
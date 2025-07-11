import express from "express"
import authRoutes from "./router/authRoutes"
import dotenv from "dotenv"
import { connectDb } from "./db"
const app = express()
dotenv.config()

app.use(express.json())
const port :string | undefined = process.env.PORT

app.use('/api/auth',authRoutes)


app.listen(port,()=>{
    connectDb()
    console.log("server is running on the port",port)
})
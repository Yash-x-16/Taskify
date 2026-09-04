import express from "express"  
import cors from "cors"
import { PORT ,DB_URL} from "./utils/envExports.js" 
import { connectDb } from "./db/db.js" 
import { authRoutes } from "./routes/authRoutes.js"
import { todoRouter } from "./routes/todoRoutes.js"

const app = express()  
app.use(cors())
app.use(express.json()) 
app.use("/api/auth",authRoutes) 
app.use("/api/todo",todoRouter) 

app.listen(PORT,async()=>{
    console.log("port is running on port ",PORT) 
    const host = await connectDb(DB_URL as string) ; 
    console.log("host is connected on ",host) ;
})
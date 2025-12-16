import express from "express" ; 
import {HTTP_PORT} from "./utils/envExports.js" 

const app = express(); 
app.use(express.json()) ; 


app.listen(HTTP_PORT,()=>{
    console.log(`server is listening on port ${HTTP_PORT}`) ; 
})
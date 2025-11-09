import express from "express" 
import { authMiddleware } from "../middleware/authMiddleware.js"

const router  = express.Router() 

try {

    router.post("/addTodo",authMiddleware) 
    router.get('/getTodo',authMiddleware)
    router.delete('/deleteTodo',authMiddleware)
    router.put('/updateTodo',authMiddleware)
    
} catch(e) {
    console.log("error in the todoRoutes",e)
}

export default router ; 
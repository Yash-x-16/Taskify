import express from "express" 
import { authMiddleware } from "../middleware/authMiddleware.js"
import { addTodo } from "../controllers/todoController.js"

const router  = express.Router() 

try {

    router.post("/addTodo",authMiddleware,addTodo) 
    router.get('/getTodo',authMiddleware)
    router.delete('/deleteTodo',authMiddleware)
    router.put('/updateTodo',authMiddleware)
    
} catch(e) {
    console.log("error in the todoRoutes",e)
}

export default router ; 
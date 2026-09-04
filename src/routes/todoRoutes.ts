import express from "express" 
import { authMiddleware } from "../middleware/authMiddleware.js"
    export const todoRouter = express.Router() 
    
    try {   
        todoRouter.get('/todo',authMiddleware) 
        todoRouter.post('/addTodo',authMiddleware) 
        todoRouter.put('/:todoId',authMiddleware) , 
        todoRouter.delete("/:todoId",authMiddleware)

    } catch (error) {
        console.log("error in the todoRoute",error)
    }

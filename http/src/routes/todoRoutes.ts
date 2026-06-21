import express from "express" 
import { authMiddleware } from "../middleware/authMiddleware.js"
import { createTodo, delTodo, getTodo, upTodo } from "../controller/todoController.js";

const todoRoutes = express.Router() 

try {
    todoRoutes.get('/getodo',authMiddleware,getTodo) ; 
    todoRoutes.post('/addTodo',authMiddleware,createTodo) ; 
    todoRoutes.delete('/delTodo',authMiddleware,delTodo) ;  
    todoRoutes.put('/upTodo',authMiddleware,upTodo) ; 
} catch (error) {
    console.log("error in the todoRoutes = ",error)
} 

export default todoRoutes
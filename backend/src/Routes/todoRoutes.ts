import express from "express" 
import { Middleware } from "../Middleware/Middleware.js"
import { addTodo, deleteTodo, getAllTodo,updateTodo } from "../Controller/todoController.js"

const router = express.Router() 

router.get('/getTodo',Middleware,getAllTodo) 
router.post('/addTodo',Middleware,addTodo) 
router.put('/updateTodo',Middleware,updateTodo) 
router.delete('/deleteTodo',Middleware,deleteTodo) 

export default router 
import express from "express" 
import { authMiddleware } from "../middleware/authMiddleware.js"
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todoController.js"

export const todoRouter = express.Router()

todoRouter.get("/",authMiddleware,getTodos)
todoRouter.post("/",authMiddleware,createTodo)
todoRouter.put("/:todoId",authMiddleware,updateTodo)
todoRouter.delete("/:todoId",authMiddleware,deleteTodo)

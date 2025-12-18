import express from "express" ; 
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addTodo, deleteTodo, getTodo, updateTodo } from "../controllers/todoController.js";

export const todoRoutes = express.Router() 

try {

    todoRoutes.get("/get",authMiddleware,getTodo) ; 
    todoRoutes.post("/add",authMiddleware,addTodo) ; 
    todoRoutes.delete("/:id",authMiddleware,deleteTodo) ; 
    todoRoutes.put("/:id",authMiddleware,updateTodo) ;  

} catch (error) {

    console.log("error in the todoRoutes",error) ;

}
import type { Request, Response } from "express";
import { todoValidation } from "../validations/todoValidations.js";
import { todo } from "../db/models/todoModel.js";

export const createTodo = async(req:Request,res:Response)=>{
    const data = todoValidation.safeParse(req.body) ; 
    if(!data.success){
        res.status(400).json({
            message:"invalid input"
        })
        return 
    }
    try {
        const {title , isCompleted} = data.data  
        const user = req.userId as string
        await todo.create({
            title , 
            isCompleted,
            createdAt:Date.now() , 
            user
        })
        res.json({
            message:"todo created"
        })
    } catch (error) {
        console.log("error in the todocreate  = ",error) 
        res.status(501).json({
            message:"internal server error"
        })
    }
}
export const getTodo = async(req:Request,res:Response)=>{
    try {
        const user = req.userId  as string 
        const todos = await todo.find({
            user
        }).lean()  

        res.json({
            message:"todos" , 
            todo : todos
        })
    } catch (error) {
        console.log("error in the getTodo  = ",error) 
        res.status(501).json({
            message:"internal server error"
        })
    }
}
export const delTodo = async(req:Request,res:Response)=>{
    try {
        const todoId = req.body.todoId as string 
       const deletedTodo =  await todo.findByIdAndDelete(todoId) 
       if(deletedTodo){
        res.json({
            message:"todo deleted succesfully"
        })
        return 
       }
    } catch (error) {
        console.log("error in the delTodo  = ",error) 
        res.status(501).json({
            message:"internal server error"
        }) 
    }
}
export const upTodo = async(req:Request,res:Response)=>{
    try {
        const todoId = req.body.todoId as string 
        const updatedTodo = await todo.findByIdAndUpdate(todoId)
        if(updatedTodo){
            res.json({
                message:"todo is updated"
            })
        }
    } catch (error) {
        console.log("error in the delTodo  = ",error) 
        res.status(501).json({
            message:"internal server error"
        }) 
    }
}
import type { Request, Response } from "express";
import { Todo } from "../models/todoModel.js";

export const addTodo = async (req:Request,res:Response)=>{
    try {
        const {title} = req.body ; 
        const userId = req.userId ; 
         await Todo.create({
            title , 
            isDone:false , 
            userid:userId
        }) 
        res.json({
            message:"created addded"
        }) 
    } catch (error) {
        console.log("error in the add todo controller") 
        res.status(500).json({
            message:"internal server error"
        })
    }
}


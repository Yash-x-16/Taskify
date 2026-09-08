import type { Request, Response } from "express";
import { todoModel } from "../db/models/todoModel.js";
import { todoSchema } from "../validations/validations.js";

export const createTodo = async(req:Request,res:Response)=>{
    const data = todoSchema.safeParse(req.body);
    if(!data.success){
        res.status(400).json({
            message:"invalid validation"
        });
        return;
    }

    try { 
        const { title , description} = data.data  
        const userId = req.userId as string
        const todo = await todoModel.create({
            isDone:false,
            createdAt:Date.now() , 
            description ,  
            title , 
            user:userId 
        });

        res.status(201).json({
            message:"todo created",
            todo
        });
    } catch (error) {
        console.log("error in the todoController",error);
        res.status(500).json({
            message:"internal server error"
        });
    }
};

export const getTodos = async(req:Request,res:Response)=>{
    try {
        const userId = req.userId as string 
        const todos = await todoModel.find({user:userId});
        res.status(200).json({
            todos
        });
    } catch (error) {
        console.log("error in the todoController",error);
        res.status(500).json({
            message:"internal server error"
        });
    }
};

export const updateTodo = async(req:Request,res:Response)=>{
    const data = todoSchema.partial().safeParse(req.body);
    if(!data.success){
        res.status(400).json({
            message:"invalid validation"
        });
        return;
    }

    try {
        const todoId = req.params.todoId  as string
        if(!todoId){
            res.status(404).json({
                message:"todo doesn't exist"
            })
            return 
        }
        const todo = await todoModel.findOneAndUpdate(
            {_id:todoId,user:req.userId},
            
        );

        if(!todo){
            res.status(404).json({
                message:"todo not found"
            });
            return;
        }

        res.status(200).json({
            message:"todo updated",
            todo
        });
    } catch (error) {
        console.log("error in the todoController",error);
        res.status(500).json({
            message:"internal server error"
        });
    }
};

export const deleteTodo = async(req:Request,res:Response)=>{
    try {
        const todo = await todoModel.findOneAndDelete({
            _id:req.params.todoId,
            user:req.userId
        });

        if(!todo){
            res.status(404).json({
                message:"todo not found"
            });
            return;
        }

        res.status(200).json({
            message:"todo deleted"
        });
    } catch (error) {
        console.log("error in the todoController",error);
        res.status(500).json({
            message:"internal server error"
        });
    }
};
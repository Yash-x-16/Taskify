import type { Request, Response } from "express";
import { Todo } from "../models/todoModel.js";
import { todoSchema } from "../validations/validations.js";

export const getTodo = async(req:Request,res:Response)=>{
    try {
        const userId = req.userId as string 
        const todos = await Todo.find({user:userId}).lean() ;  
        res.json({
            message:"here are your todos" , 
            todos
        })
        return 
    } catch (error) {
        res.status(500).json({
            message:"internal server error"
        })
        console.log("error in the getTodo",error) ; 
    }
} ; 

export const addTodo = async(req:Request,res:Response)=>{
    const result = todoSchema.safeParse(req.body) ; 
    const userId = req.userId as string 
    if(!result.success){
        res.status(400).json({
            message:"invalid validation"
        })
        return 
    }

    try {
        const {title,isDone} = result.data 
        await Todo.create({
            title , 
            isDone , 
            user:userId 
        })    
        res.json({
            message:"todo added" 
        })
        return 
    } catch (error) {
        console.log("error in the addTodo",error) 
        res.status(500).json({
            message:"internal server error"
        })
    }
} ;

export const updateTodo = async(req:Request,res:Response)=>{
    const result = todoSchema.safeParse(req.body) ; 
    if(!result.success){
        res.status(400).json({
            message:"invalid validation"
        })
        return 
    }
    const todoId = req.params.id  as string 
    
    if(!todoId){
        res.status(404).json({
            message:"todo not found"
        })
        return 
    }
    try {
        const {title,isDone} = result.data ; 
        const updatedTodo = await Todo.findByIdAndUpdate(todoId,{title,isDone}).lean() ; 
        if(updatedTodo){
            res.json({
                message:"todo updated"
            })
            return 
        }
    } catch (error) {
        console.log("error in the updateTodo",error) ; 
        res.status(500).json({
            message:"iternal server error"
        })
    }
} ; 

export const deleteTodo = async(req:Request,res:Response)=>{
    const todoId = req.params.id 
    if(!todoId){
        res.status(404).json({
            message:"todo not found"
        })
        return 
    }
    try {
        const deletedTodo = await Todo.findByIdAndDelete(todoId) 
        if(deletedTodo){
            res.json({
                message:"todo deleted succesfully" 
            })
            return 
        }
    } catch (error) {
        console.log("error in the deleteTodo",error) 
        res.status(500).json({
            message:"internal server error"
        })
    }
} ; 
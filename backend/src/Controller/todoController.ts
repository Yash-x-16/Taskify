import type { Request, Response } from "express";
import { client } from "../db/Db.js";

export const getAllTodo = async (req:Request,res:Response)=>{
    try{
        const Id = req.userId;
        const userId = Number(Id)

        const Todos = await client.todo.findMany({
            where:{
                userId
            }
        })

        if(Todos){
            res.json({
                message:"here are your todos" , 
                Todos
            })
        }
    }catch(e){
        res.json({
            message:"error in the get all todos"  , 
            error:e       
    })
    }
} 

export const addTodo = async(req:Request,res:Response)=>{
    try {
        const {title,isDone,description} = req.body ; 
        const Id = req.userId 
      const addTodo =  await client.todo.create({
            data:{
                title , 
                description , 
                isDone ,
                user:{
                    connect:{
                       Id: Number(Id)
                    }
                }
            }
        }) 
        res.json({
            message : "added todo " , 
            todos: {...addTodo} 
        })
    } catch (error) {
        res.json({
            message:"error in the addTodo controller" ,
            error
        })
    }
}
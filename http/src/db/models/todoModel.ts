import mongoose, { model, Model, Schema } from "mongoose";

const todoSchema = new Schema({
    title :{
        type:String , 
        required:true
    } , 
    isCompleted:{
        type:Boolean , 
        required:true
    } , 
    user:{
        type:mongoose.Schema.ObjectId
    } , 
    createdAt :{
        type:Date
    }
}) 

export const todo = model("todo",todoSchema)
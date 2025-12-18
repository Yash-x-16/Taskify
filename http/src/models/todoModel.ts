import { model, Schema } from "mongoose";

const todoSchema = new Schema({
    title:{
        type:String , 
        required:true , 
    } , 
    isDone:{
        type:Boolean , 
        required:true , 
    } , 
    user:{
        type:Schema.Types.ObjectId , 
        ref:"user"
    }
}) 

export const Todo = model("todo",todoSchema) ; 
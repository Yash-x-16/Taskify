import mongoose, { Schema,model } from "mongoose";

const todoSchema = new Schema({
   todoId:{
    type:Schema.Types.ObjectId  ,  
   },
   userid:{
    type:Schema.Types.ObjectId , 
    ref:"User"
   },
    title:{
        type:String , 
        required:true 
    } , 
    isDone:{
        type:Boolean , 
        default:false , 
    } , 
    createdAt:{
        type:Date , 
        default:Date.now() 
    }
}) 
export const Todo = model("Todo",todoSchema) ; 
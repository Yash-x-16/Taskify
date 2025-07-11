import mongoose, { Schema } from "mongoose";


const todoSchema = new Schema({
    task : {
        type: String , 
        required : true 
    },
    hasDone :Boolean
}) 

export const todo = mongoose.model("todo",todoSchema)
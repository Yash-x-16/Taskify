import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    email:{
        type:String,
        required:true,
        unique:true
    }, 
    password:{
        type:String , 
        required:true , 
    },
    name:{
        type:String , 
        required:true , 
    },
     todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'todo' }]
},{timestamps:true}) 

export const user = mongoose.model("user",userSchema)
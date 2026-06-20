import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String , 
        required:true , 
        unique:true , 
        min:6 
    } , 
    email:{
        type:String , 
        required:true , 
        unique:true ,  
    } , 
    password:{
        type:String , 
        required:true , 
        min : 6 
    } ,   
    profilePicture:{
        type:String , 
    },
    todos:[{
        type:mongoose.Schema.ObjectId 
    }] , 
    createdAt:{
        type:Date , 
        required:true 
    }
}) 

export const user = model("user",userSchema)
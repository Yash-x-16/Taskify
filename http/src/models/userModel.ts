import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String , 
        required:true , 
        unique:true 
    } , 
    password:{
        type:String , 
        required:true , 
    } , 
    email:{
        type:String , 
        required:true , 
        unique:true 
    } , 
    tasks:[{
        type:Schema.Types.ObjectId , 
        ref:"todos"
    }]   , 
    selectedProfile:{
        type:Schema.Types.ObjectId , 
        ref:"pictures"
    }
})

export const User = model("user",userSchema) ; 
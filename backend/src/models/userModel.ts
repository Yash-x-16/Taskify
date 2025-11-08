import { Schema ,model} from "mongoose"; 

const UserSchema = new Schema({
    userName:{
        type:String ,  
        required:true  , 
        unique:true 
    } , 
    profilePicture:{
        type:String  ,
        default:process.env.DEFAULT_PROFILE_PICTURE 
    } , 
    password:{
        type:String ,
        required:true 
    } , 
    email:{
        type:String , 
        required:true , 
        unique:true 
    } , 
    createdAt:{
        type:Date , 
        default:Date.now()
    }  , 
    todo:[{
        userId:Schema.Types.ObjectId , 
        ref:"Todo"
    }]
}) 

export const User =  model("User",UserSchema) ; 
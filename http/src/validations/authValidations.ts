import {z} from "zod" 

export const signupValidation = z.object({
    username:{
        type:z.string , 
        min:z.minSize(6) 
    } , 
    email :{
        type:z.email() 
    } ,
    password:{
        type:z.string() , 
        min:z.minSize(6)
    } 
}) 

export const signinValidations = z.object({
    username:{
        type:z.string , 
        min:z.minSize(6) 
    }, 
     password:{
        type:z.string() , 
        min:z.minSize(6)
    } 
})
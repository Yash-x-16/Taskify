import {email, z} from "zod" 

export const signupValidation = z.object({
    username:z.string().min(6).max(30)  , 
    password:z.string().min(6) , 
    email:z.email() , 
    profilePicture:z.string()
})  

export const SigninValidations = z.object({
    email:z.email() , 
    password:z.string().min(6)
})
import z from "zod" 

export const signupSchema = z.object({
    username:z.string().min(6).max(25) , 
    password:z.string().min(6) , 
    email:z.email() , 
}) 

export const signinSchema = z.object({
    email :z.email() , 
    password:z.string().min(6)
})

export const todoSchema = z.object({
    title:z.string() , 
    isDone:z.boolean() 
})
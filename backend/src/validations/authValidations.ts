import z from "zod"
export const signupValidation = z.object({
    username:z.string().min(6).max(20)  , 
    email:z.email()  , 
    profilePicture:z.string().optional()  , 
    password:z.string().min(6) 
})

export const signinValidation = z.object({
    email:z.email() , 
    password:z.string().min(6)
})
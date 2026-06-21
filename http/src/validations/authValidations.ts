import {z} from "zod" 

export const signupValidation = z.object({
   username:z.string().min(6),
   email:z.string().email(),
   password:z.string().min(6)
})

export const signinValidations = z.object({
     username:z.string().min(6),
     password:z.string().min(6)
})
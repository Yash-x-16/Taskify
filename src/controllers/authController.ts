import type { Request, Response } from "express";
import { signUpSchema } from "../validations/validations.js"; 

export const signUp =(req:Request,res:Response)=>{
    const data = signUpSchema.safeParse(req.body) ;  
    if(!data.success){ 
        res.status(400).json({
            message:"invalid validation"
        })
        return 
    }
    try {
        const {userName,email,password} = data.data 

    } catch (error) {
        
    }
}
export  const signIn =(req:Request,res:Response)=>{} 

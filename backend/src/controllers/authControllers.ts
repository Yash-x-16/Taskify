import type { Request, Response } from "express";
import { signupValidation,signinValidation } from "../validations/authValidations.js";
export const signup = async(req:Request,res:Response)=>{
   const result = signupValidation.safeParse(req.body) 
   
   if(result.error){
   console.log("error in the validation",result.error)
    res.status(400).json({
        message:"invalid Validation!"
    })
    return 
   }

    try {
        const {username,password,}=result.data ;      
    } catch (error) {
        
    }
}
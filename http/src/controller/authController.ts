import type { Request, Response } from "express"
import { signupValidation } from "../validations/authValidations.js"
import { user } from "../db/models/userModel.js";

export const signup = async(req:Request,res:Response)=>{
    const data = signupValidation.safeParse(req.body) ; 

    if(!data.success){
        res.json({
            message :"error in the input"
        })
        return 
    }    

    try {  
        
       const {username,email,password} = data.data ; 
       
        const checkIfAlreadyUser = await user.findOne({where:{
            email 
        }}) 

        if(checkIfAlreadyUser){
            res.json({
                message:"user already exists"
            })
            return 
        }
        const newUser = await user.create({
            email   ,
            password , 
            username , 
            createdAt:Date.now() 
        })

        res.status(200).json({
            message:"user created" , 
            user :{...newUser , password:null} 
        })
        
    } catch (error) {
        console.log("error in the signup function",error)
        res.status(404).json({
            message:"error" , 
        })
    }
}

export const signin = async(req:Request,res:Response)=>{}
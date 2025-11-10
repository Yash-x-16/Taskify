import type { Request, Response } from "express";
import { signupValidation,signinValidation } from "../validations/authValidations.js";
import { User } from "../models/userModel.js"; 
import jwt, { type JwtPayload } from "jsonwebtoken" 
import bcrypt from "bcrypt"
import { email } from "zod";

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
        const {username,password,email}=result.data ;
        
        const isUSerAlreadyExist = await User.find({
            email
        }) 

        if(isUSerAlreadyExist.length>0){
            res.status(409).json({
                message:"user already exist"
            })
            return 
        }   
        const salt = await bcrypt.genSalt(8)
        const hashedPassword = await bcrypt.hash(password,salt) ; 
        const createdUser = await User.create({
            email , 
            username , 
            password:hashedPassword 
        }) 
        const token = jwt.sign({userId:createdUser._id} as JwtPayload ,process.env.JWT_SECRET as string) 
        res.status(200).json({
            message:"user created",
            token 
        })
    } catch (error) {
        console.log("error in the signup constroler \n",error) 
        res.status(500).json({
            message:"internal server error"
        })
    }
} 

export const Signin = async (req:Request,res:Response)=>{
    
    const result = signinValidation.safeParse(req.body) 
    
    if(result.error){
        res.status(400).json({
            message:"invalid validation"
        })
        console.log("error in validation",result.error) 
        return
    }

    try {
        const {email,password} = result.data ; 
        const isUserExist = await User.findOne({
            email
        })
        if(isUserExist){
            const hashedPassword = await bcrypt.compare(password,isUserExist.password) 
            if(hashedPassword){
                const token = jwt.sign({userId:isUserExist._id}as JwtPayload,process.env.JWT_SECRET as string )
                res.status(200).json({
                    message:"logged in" , 
                    token 
                })
            }
            return 
        }else{
            
            res.status(400).json({
                message:"unauthorized"
            })

            return  ; 
        }
    } catch (error) {
        console.log("Error in the signin controller",error)
        res.status(500).json({
            message:"internal server error"
        })
    }
}
;
export const getUser =async (req:Request,res:Response)=>{
    try {
        const userId = req.userId ; 
        if(!userId){
            res.status(400).json({
                message:"unauthorized"
            })
            return ; 
        }
        const user = await User.findById(userId) ; 
        if(user){
            res.json({
                username:user.userName , 
                profilePicture:user.profilePicture , 
                email:user.email , 
                todo:user.todo 
            })
            return 
        }
        if(!user){
            res.status(404).json({
                message:"user not found"
            })
        }
    } catch (error) {
        console.log("error in the get user controller",error) 
        res.status(500).json({
            message:"internal server error"
        })
    }
}
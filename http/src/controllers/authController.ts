import type { Request, Response } from "express";
import { signinSchema,signupSchema } from "../validations/validations.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt" ; 
import { JWT_SECRET } from "../utils/envExports.js";
import jwt, { type JwtPayload } from "jsonwebtoken" 

export const Signup = async(req:Request,res:Response)=>{
    const result = signupSchema.safeParse(req.body) ; 
    if(!result.success){
        res.status(404).json({
            message:"inValid validation"
        }) 
        return 
    }
    try {
        const {username,password,email} = result.data  ; 
        const isUserAlreadyExist = await User.findOne({
            email
        }) 
        if(isUserAlreadyExist){
            res.status(400).json({
                message:"user already exist"
            }) 
            return 
        }
        const salt = await  bcrypt.genSalt(8) ; 
        const hashedPassword = await bcrypt.hash(password,salt) ; 
        const user = await User.create({
            email , 
            username , 
            password:hashedPassword 
        }) ; 
        const token = jwt.sign({userId:user._id}as JwtPayload,JWT_SECRET as string) ;   
        res.json({
            message:"user created" , 
            username:user.username , 
            email:user.email , 
            todo:user.tasks ,  
            token
        })
    } catch (error) {
        console.log("error in the signup",error)  , 
        res.status(500).json({
            message:"internal server error"
        })
    }
}

export const Signin = async(req:Request,res:Response)=>{
    const result = signinSchema.safeParse(req.body) ; 
    if(!result.success){
        res.status(400).json({
            message:"invalid validation" 
        })
        return ; 
    }
    try {
        const {email,password} = result.data ;  
        const isUserAlreadyExist = await User.findOne({email}) ; 
        if(isUserAlreadyExist){
            const checkPassword = await bcrypt.compare(password,isUserAlreadyExist.password) ; 
            if(checkPassword){
                const token = jwt.sign({userId:isUserAlreadyExist._id}as JwtPayload,JWT_SECRET as string) ; 
                res.json({
                    message:"user logged in" , 
                    token 
                })
                return 
            }else{
                res.status(400).json({
                    message:"unAuthorized !" 
                })
                return 
            }
        }
    } catch (error) {
        console.log("error in the signin",error) 
        res.status(500).json({
            message:"internal server error" 
        })
    }
}

export const isUser = async(req:Request,res:Response)=>{
    try {
        const userId = req.userId ; 
        const user = await User.findById(userId as string) ; 
        if(user){
            res.json({
                message:"user found" , 
                username:user.username , 
                email:user.email , 
                todo:user.tasks 
            })
            return 
        }else{
            res.status(404).json({
                message:"user not Found"
            })
        }
    } catch (error) {
        console.log("error in the isUser",error) ; 
        res.status(500).json({
            message:"internal server error" 
        })
    }
}
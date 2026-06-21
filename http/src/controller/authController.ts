import type { Request, Response } from "express" 
import { Salt } from "../utils/envExports.js";
import { signupValidation , signinValidations } from "../validations/authValidations.js"
import { user } from "../db/models/userModel.js"; 
import bcrypt from "bcrypt" 
import jwt, { type JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "../utils/envExports.js";

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
       
        const checkIfAlreadyUser = await user.findOne({
            email
        })

        console.log("already user  = ",checkIfAlreadyUser)
        if(checkIfAlreadyUser){
            res.json({
                message:"user already exists"
            })
            return 
        } 
        const newPass = await bcrypt.hash(password,Number(Salt))
        const newUser = await user.create({
            email   ,
            password :newPass , 
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

export const signin = async(req:Request,res:Response)=>{
    const data = signinValidations.safeParse(req.body) ; 
    if(!data.success){
        res.json({
            message:"invalid input"
        })
        return 
    }

    try {
        const {username ,password} = data.data 
        const isUserExists = await user.findOne({
            username
        })  
        if(!isUserExists){
            res.status(404).json({
                message:"user not found"
            })
        }
        if(isUserExists){
            const passCheck = await bcrypt.compare(password,isUserExists.password) ; 
            if(passCheck){
                const token = jwt.sign({userId: isUserExists._id}as JwtPayload,JWT_SECRET as string)  
                res.json({
                    message:"user Logged in" , 
                    token 
                })
                return
            } else{
                res.status(400).json({
                    message:"unauthorized"
                })
                return 
            }  
        }
    } catch (error) {
        console.log("error in the signin controller = ",error) 
        res.status(400).json({
            message:"error"
        })
    }
}
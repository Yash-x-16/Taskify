import type { Request, Response } from "express";
import { signInSchema, signUpSchema } from "../validations/validations.js"; 
import { userModel } from "../db/models/userModel.js"; 
import bcrypt from "bcrypt"
import { SALT_ROUNDS ,defaultProfilePicture,jwtSecret} from "../utils/envExports.js";
import jwt from "jsonwebtoken"

export const signUp =async(req:Request,res:Response)=>{ 
    console.log("control reached")
    const data = signUpSchema.safeParse(req.body) ;  
    if(!data.success){ 
        res.status(400).json({
            message:"invalid validation"
        })
        return 
    }
    try {
        const {userName,email,password} = data.data  
        const user = await checkUserAlreadyExist(email) ; 

        if(user=="no user Found"){ 
            const hashedPassword  = await bcrypt.hash(password,Number(SALT_ROUNDS))
             await userModel.create({
                email , 
                userName , 
                password:hashedPassword , 
                createdAt:Date.now()  , 
                profilePicture:defaultProfilePicture as string
            }) 

            res.status(201).json({
                message:"user created" , 
                user: {userName, email , profilePicture:defaultProfilePicture}
            })
        }else{
            res.status(400).json({
                message:"user already exist"
            })
        }

    } catch (error) {
        console.log("error in the authController", error) 
        res.status(500).json({
            message:"error in the server"
        })
    }
}


export  const signIn =async(req:Request,res:Response)=>{
    const data = signInSchema.safeParse(req.body) ; 
    if(!data.success){
        res.status(400).json({
            message:"invalid Validation" 
        })
        return 
    }
    try {
        const {email,password} = data.data ; 
        const user = await(checkUserAlreadyExist(email)) ; 
        if(user!=="no user Found" && user != undefined){
           const userId = user.user._id
           console.log("user pass word is :  ",user)
            const passCheck = await bcrypt.compare(password,user.user.password) 
            if(passCheck){
                const token = jwt.sign({userId},jwtSecret as string )   
                res.status(200).json({
                    message:"user is authenticated" , 
                    token 
                })
                return 
            }else{
                res.status(400).json({
                    message:"unauthenticated user"
                })
                return 
            }

        }else{
            res.status(404).json({
                message:"user not found"
            })
        }
    } catch (error) {
        console.log("error in the authController" , error) 
        res.status(500).json({
            message:"internal server error"
        })
    }
} 


const checkUserAlreadyExist = async(email:string)=>{
    try {
        const user = await userModel.findOne({email}).lean() ; 
        if(!user){
            return "no user Found"
        }else{
            return {
                user : {...user}
            }
        }
    } catch (error) {
        console.log("error in checking user ",error)
    }
}
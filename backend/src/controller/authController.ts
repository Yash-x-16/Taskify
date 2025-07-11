import { Request, Response } from "express"
import { user } from "../models/userModel"
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"

export const signup = async(req:Request,res:Response)=>{
    const {username,email,password} = req.body 
    try{
        if(!username || !email || !password){
            res.status(404).send({
                message:"all feilds are required !!"
            })
        }
    const alreadyExist = await user.findOne({
            email:email
        })

        if(alreadyExist){
             res.status(400).json({success:false,message:"user already exist"})
        }

        const hashedPassword = await bcrypt.hash(password,5)
       


        const User = new user({
            email,
            password:hashedPassword ,
            name:username,
            createdAt:Date.now()
        })

        await User.save()
    }catch(e){
        res.status(400).send({
            message:`error in signup controller is ${e}`
        })
    }
}


export const signin = async(req:Request,res:Response)=>{
   
    const {email ,password} = req.body ; 
   dotenv.config()
   const jwt_secret = process.env.JWT_SECRET
    try{

         if(!email || !password){
            res.status(404).send({
                message:"all feilds are required !!"
            })
        }

         const alreadyExist = await user.findOne({
            email:email
        })

        const hashedPassword = await bcrypt.compare(password,alreadyExist?.password as string)

        if(hashedPassword){

            jwt.sign(alreadyExist?._id as JwtPayload  ,jwt_secret as string)
            res.status(201).send({
                message:"logged in "
            })
        }

    }catch(e){
        res.status(400).send({
            message:`error in signin controller is ${e}`
        })
    }
}
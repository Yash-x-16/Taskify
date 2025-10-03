import  { type Request, type Response } from "express" 
import { signupValidation,SigninValidations } from "../Validations/authValidations.js"
import bcrypt from "bcrypt"
import { client } from "../db/Db.js"
export const Signup = async(req:Request,res:Response)=>{
   
    const result = signupValidation.safeParse(req.body)

    if(result.error){
        res.json({
            message:"invalid validations"
        })
        return 
    }

    try {

        const {username,password,email,profilePicture} =  result.data
        
        const alreadyExist =await client.users.findUnique({
            where:{
                email
            }
        })

        if(alreadyExist){
            res.json({
                message:"user already exist with this email" , 
            })

            return 
        }
        const hashedPassword = await bcrypt.hash(password,7) 
        const user  = client.users.create({
            data:{
                email , 
                username,
                password:hashedPassword 
            }
        })

        res.json({
            message:"user created !!" , 
            user : {...user,
            password:null}       
    })

    }catch(error){
        res.json({
            message:"error in signup controller" , 
            error:`4${error}` 
        })
    }
}
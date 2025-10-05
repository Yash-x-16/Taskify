import  { type Request, type Response } from "express" 
import { signupValidation,SigninValidations } from "../Validations/authValidations.js"
import bcrypt from "bcrypt"
import { client } from "../db/Db.js"
export const Signup = async(req:Request,res:Response)=>{
   
    const result = signupValidation.safeParse(req.body)

    if(result.error){
        res.json({
            message:"invalid validations" ,
            error:result.error
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
        const user  = await client.users.create({
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

export const Signin = async (req:Request,res:Response)=>{
    const result = SigninValidations.safeParse(req.body) ; 
    if(result.error){
        res.json({
            message:"invalid validations"
        })
        return ; 
    }
    try{ 
        
        const {email,password}=result.data 
        const alreadyExist = await client.users.findUnique({
            where:{
                email 
            }
        })

        if(alreadyExist){
            res.json({
                message:"user doen't exist"        
        
            })
        }

        const hashedPassword = await bcrypt.compare(password,alreadyExist?.password as unknown as string)
        
        if(hashedPassword){
            //@ts-ignore
            const token = jwt.sign(alreadyExist?.Id,JWT_SECRET) ;
            
            res.status(200).json({
                message:"user logged in" , 
                token 
            })

        }else{
            res.status(404).json({
                message:"unauthorized user"
            })
        }

    }catch(e){
        res.json({
            message:"error occured in the sigin controller !!" , 
            error:e
        })
    }
}
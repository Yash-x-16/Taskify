import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken" 
import { jwtSecret } from "../utils/envExports.js"; 

export const authMiddleware =(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers["token"] ; 
    if(!token){
        res.status(400).json({
            message:"unAuthorized"
        }) 
        return 
    }

    try {
        const decoded  = jwt.verify(token as string, jwtSecret as string) as JwtPayload 
        const userId = decoded.userId ; 
        if(!userId){
            console.log("no userId found") ; 
            res.status(500).json({
                message:"internal server error" 
            })
            return 
        }else{ 
            
            next() ; 
        }

    } catch (error) {
        console.log("error in the authMiddleware",error) ; 
        res.status(500).json({
            message:"internal server error" 
        })
    }
}
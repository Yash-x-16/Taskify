import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "../utils/envExports.js";
export const authMiddleware =(req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.headers["token"]
        if(!token){ 
            res.status(404).json({
                message:"no token provided"
            })
            return
        }
        const decoded = jwt.verify(token as string,JWT_SECRET as string) as JwtPayload 
        if(decoded.userId){
            req.userId = decoded.userId ; 
            next() 
        }else{
            res.status(404).json({
                message:"unauthorized by middleware"
            }) 
            return 
        }
    } catch (error) {
      console.log("error in the authmiddleware = ",error)  
    }
}
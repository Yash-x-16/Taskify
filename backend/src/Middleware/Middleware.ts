import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken" 
import dotenv from "dotenv" 
dotenv.config()
export const Middleware = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        
        const token = req.headers["token"]
       
        const JWT_SECRET = process.env.JWT_SECRET ; 
        const decoded = jwt.verify(token as string,JWT_SECRET as string) as JwtPayload ; 
   
        if(decoded){
             req.userId= decoded as unknown as string;
             next() ;  
        }else{
            throw new Error("error is here :) :) :)") ; 
        }
        
    }
    catch(e){

        res.status(404).json({
            message:"unauthorized by the middleware",
            error:e
        })
    }
}
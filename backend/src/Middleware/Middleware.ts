import type { NextFunction, Request, Response } from "express";

export const Middleware = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        
        const token = req.headers["token"]
        // @ts-ignore
        
        const decoded = jwt.verify(token,Jwt_secret) ; 
        
        if(decoded){
             req.userId= decoded.id;
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
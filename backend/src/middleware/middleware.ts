import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv"
import jwt, { JwtPayload } from "jsonwebtoken"

export const Middleware  = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        dotenv.config()
   const token = req.headers["token"] ;
   const jwt_secret = process.env.JWT_SECRET
 const decoded = jwt.verify(token as string, jwt_secret as string);

if (typeof decoded === "object" && decoded !== null && "_id" in decoded) {
  const { _id } = decoded as { _id: string };
  req._id = _id;
  next();
} else {
  res.status(401).send({ message: "unauthorized!!" });
}    
    }catch(e){
        res.status(404).send({
            message:`error in the middleware !!`
        })
    }
    
    
}
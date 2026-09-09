import express, { Router } from "express"
import { signIn, signUp } from "../controllers/authController.js"
   
export  const authRouter:Router = express.Router() 
    try {     
        authRouter.post("/signup",signUp)
        authRouter.post("/signin",signIn)         
    } catch (error) {
        console.log("error in the authRoutes",error) ; 
    }

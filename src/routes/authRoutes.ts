import express from "express"
import { signIn, signUp } from "../controllers/authController.js"
export const authRoutes = ()=>{
    try {
        const router = express.Router() 
        router.post("/signup",signUp)
        router.post("/signup",signIn) 
        
    } catch (error) {
        console.log("error in the authRoutes",error) ; 
    }
}
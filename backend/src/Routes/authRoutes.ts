import express from "express" ; 
import { Signin, signup } from "../controllers/authControllers.js";

const router= express.Router() 

try {
    router.post('/signup',signup)
    router.post('/signin',Signin) 
} catch (error) {
    console.log("error in authRoutes",error)
}

export default router ; 
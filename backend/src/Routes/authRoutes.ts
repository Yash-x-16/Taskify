import express from "express" ; 
import { getUser, Signin, signup } from "../controllers/authControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router= express.Router() 

try {
    router.post('/signup',signup)
    router.post('/signin',Signin) 
    router.get('/getUser',authMiddleware,getUser) 
} catch (error) {
    console.log("error in authRoutes",error)
}

export default router ; 
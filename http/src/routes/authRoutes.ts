import express from "express" ; 
import { isUser, Signin, Signup } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const authRoutes = express.Router() ; 

try {
    authRoutes.post('/signup',Signup); 
    authRoutes.post('/signin',Signin) ; 
    authRoutes.get('/isUser',authMiddleware,isUser) ;  
} catch (error) {
    console.log("error in the authRoutes",error) ; 
}
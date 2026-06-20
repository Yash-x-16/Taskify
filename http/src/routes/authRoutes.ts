import express from "express"; 
import { signin, signup } from "../controller/authController.js";

const authRouter = express.Router() 


try {
    authRouter.post("/signup",signup) ; 
    authRouter.post("/signin",signin) ; 
} catch (error) {
    console.log("error in authRoutes",error) ; 
}

export default authRouter
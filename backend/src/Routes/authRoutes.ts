import express from "express" 
import { Signin, Signup } from "../Controller/authController.js";

const router = express.Router() ; 

router.post('/signup',Signup)
router.post('/signin',Signin)

export default router
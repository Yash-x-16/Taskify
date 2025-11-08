import express from "express" ; 

const router= express.Router() 

try {
    router.post('')
} catch (error) {
    console.log("error in authRoutes",error)
}

export default router ; 
import express from "express" 

const router  = express.Router() 

try {
    router.post("/addTodo") 
    router.get('/getTodo')
    router.delete('/deleteTodo')
    router.put('/updateTodo')
} catch(e) {
    console.log("error in the todoRoutes",e)
}

export default router ; 
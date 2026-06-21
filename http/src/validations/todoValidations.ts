import {z} from "zod" 

export const todoValidation = z.object({
    title : z.string() , 
    isCompleted:z.boolean() 
})
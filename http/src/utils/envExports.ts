import dotenv from "dotenv" 
dotenv.config() 

export const DB_url = process.env.DB_URL
export const JWT_SECRET = process.env.JWT_SECRET 
export const port = process.env.PORT
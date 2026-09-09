import dotenv from "dotenv" 

dotenv.config() 

export const PORT = process.env.PORT
export const DB_URL = process.env.DB_URL
export const SALT_ROUNDS = process.env.SALT_ROUNDS 
export const defaultProfilePicture= process.env.DEFAULT_PROFILE_PICTURE 
export const jwtSecret = process.env.JWT_SECRET
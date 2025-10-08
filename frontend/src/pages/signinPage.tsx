import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom" 
import { BACKEND_URL } from "../utils/utils";



export function Signin (){   
    const navigate = useNavigate()

    const [email,setEmail]= useState("") ; 
    const [password,setPassword] = useState("") 
    
    async function sendSigninRequest(){
        const response = await axios.post(`${BACKEND_URL}/api/auth/signin`,{
            email,
            password
        }) 
        console.log(response.data) 
        const token = response.data.token 
        console.log(token) 
        localStorage.setItem('token',token) ; 

    }
    
    return <div className="h-screen w-screen relative flex justify-center items-center">
        <div className="bg-gray-500 h-auto w-96 rounded-md shadow-md p-4 flex flex-col  ">
            <div className="text-white font-medium text-2xl flex   justify-center">
                Signin
            </div> 
            <div className="flex flex-col mt-5 gap-2"> 
                <span className="text-white font-bold "> Email</span> 
                  <input type="text" 
                 onChange={(e)=>{setEmail(e.target.value)}}
                  placeholder="dogesh@gmail.com" 
                  className="focus:outline-none px-2 py-2 text-gray-500 hover:scale-105 transition-all duration-300 bg-white rounded-lg"/>
            </div>
            <div className="flex flex-col mt-5 gap-2"> 
                <span className="text-white font-bold "> Password</span> 
                  <input
                    onChange={(e)=>{setPassword(e.target.value)}}
                   type="password"
                   placeholder=" . . . . "
                    className="focus:outline-none px-2 py-2 text-gray-500 hover:scale-105 transition-all duration-300 bg-white rounded-lg"/>
            </div>
          <div className="mt-5 flex justify-center">
            <button 
            onClick={sendSigninRequest}
             className="bg-yellow-600 w-32 px-4 py-2 text-white  font-medium rounded-lg cursor-pointer hover:scale-105 transition-all duration-300 shadow-md active:scale-100 ">
                Signin</button> 
          </div>
          <span className="text-white justify-center flex mt-4" >
            go to signup page ? 
            <span className="text-blue-400 pl-2 cursor-pointer"
            onClick={()=>{
                navigate('/signup')
            }}>click me</span> 
          </span>
        </div>
    </div>
}
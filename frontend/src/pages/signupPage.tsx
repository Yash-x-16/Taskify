import { useNavigate } from "react-router-dom" 
import { useRef } from "react" 
import axios from "axios"
import { BACKEND_URL } from "../utils/utils"
export function Signup(){  

    const emailref = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const usernameRef = useRef<HTMLInputElement | null>(null)

    const emailValue = emailref.current?.value 
    const usernameValue = usernameRef.current?.value 
    const passwordValue = passwordRef.current?.value   

  async  function   SendSignupRequest(){
       const response = await  axios.post(`${BACKEND_URL}/api/auth/signup`,{
        email:emailValue , 
        username:usernameValue , 
        password:passwordValue
       })
       console.log(response) ; 
    }

    const Navigate = useNavigate() 
    
    return<div className="h-screen w-screen relative flex justify-center items-center">
        <div className="bg-gray-500 h-auto w-96 rounded-md shadow-md p-4 flex flex-col  ">
            <div className="text-white font-medium text-2xl flex   justify-center">
                Signup
            </div> 
            <div className="flex flex-col mt-5 gap-2"> 
                <span className="text-white font-bold "> Email</span> 
                  <input 
                  ref={emailref}
                   type="text" 
                  placeholder="dogesh@gmail.com" 
                  className="focus:outline-none px-2 py-2 text-gray-500 hover:scale-105 transition-all duration-300 bg-white rounded-lg"/>
            </div>
            <div className="flex flex-col mt-5 gap-2"> 
                <span className="text-white font-bold "> username</span> 
                <input 
                ref={usernameRef}
                type="text" 
                placeholder="dogesh" 
                className="focus:outline-none px-2 py-2 text-gray-500 hover:scale-105 transition-all duration-300 bg-white rounded-lg"/>
            </div>
            <div className="flex flex-col mt-5 gap-2"> 
                <span className="text-white font-bold "> Password</span> 
                  <input 
                  ref={passwordRef}
                  type="password"
                   placeholder=" password " 
                   className="focus:outline-none px-2 py-2 text-gray-500 hover:scale-105 transition-all duration-300 bg-white rounded-lg"/>
            </div>
          <div className="mt-5 flex justify-center">
            <button 
            onClick={SendSignupRequest}
            className="bg-yellow-600 w-32 px-4 py-2 text-white  font-medium rounded-lg cursor-pointer hover:scale-105 transition-all duration-300 shadow-md active:scale-100 ">
                Signup</button> 
          </div>
          <span className="text-white justify-center flex mt-4" >
            go to signin page ? 
            <span className="text-blue-400 pl-2 cursor-pointer" onClick={()=>{
                Navigate('/signin')
            }}>click me</span> 
          </span>
        </div>
    </div>
}

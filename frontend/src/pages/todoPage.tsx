
import { useRef } from "react";



interface todo{
    title:string , 
    isDone:any
}
export function TodoPage(){ 
const title= useRef<HTMLInputElement | null>(null)
const isDone= useRef<HTMLInputElement | null>(null) ; 
    const titleRef = title.current?.value 
    const boolRef = isDone.current?.value  
    
    let alltodos:todo[] =[] 
    function addTodo(){
    alltodos.map((x)=>{
        return  <div className="bg-neutral-700 w-full size-10 flex justify-between">  
                
                <span className="text-md text-white ml-2">
                   {x.title} 
                </span>
                <input type="checkbox" name="sd" id="ad" className="rounded-full border mr-2" 
                ref={isDone}
                 checked={true}/>
            </div>
    }) 


}
    return <div className="h-screen w-screen bg-gray-300 relative flex justify-center p-6">
        <div className="text-3xl font-medium flex flex-col items-center h-auto w-96  rounded-2xl shadow-md bg-gray-500">
        <h1 className="text-3xl font-medium mt-5 text-white">
            MyTodo
        </h1> 
        <div className="flex mt-5 items-center justify-between">
            <input type="text" 
            placeholder="add your  todo" 
            ref={title}
             className="border hover:scale-105 transition-all duration-300 text-lg focus:outline-none  rounded-md bg-white text-emerald-600  px-4 py-1  "/>
            <button className="bg-green-500 h-10 rounded-md  text-sm px-2 text-white font-bold cursor-pointer ml-4 shadow-md hover:scale-105 transition-all duration-300 w-20 active:scale-100" onClick={addTodo}>Add</button>
        </div>
        <div className="mt-2 text-white">
           My Task
        </div>

        <div className=" mt-5  w-full p-4">
            <div className="bg-neutral-700 w-full size-10 flex justify-between">  
               { alltodos.map((x)=>{
        return  <div className="bg-neutral-700 w-full size-10 flex justify-between">  
                
                <span className="text-md text-white ml-2">
                   {x.title} 
                </span>
                <input type="checkbox" name="sd" id="ad" className="rounded-full border mr-2" 
                ref={isDone}
                 checked={true}/>
            </div>
    }) } 

            </div>
        </div>
        </div>
    </div>
}


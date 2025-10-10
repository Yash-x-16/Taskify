


export function TodoPage(){ 


    return <div className="h-screen w-screen bg-gray-300 relative flex justify-center p-6">
        <div className="text-3xl font-medium flex flex-col items-center h-auto w-96  rounded-2xl shadow-md bg-gray-500">
        <h1 className="text-3xl font-medium mt-5 text-white">
            MyTodo
        </h1> 
        <div className="flex mt-5 items-center justify-between">
            <input type="text" 
            placeholder="add your  todo" 
            
             className="border hover:scale-105 transition-all duration-300 text-lg focus:outline-none  rounded-md bg-white text-emerald-600  px-4 py-1  "/>
            <button className="bg-green-500 h-10 rounded-md  text-sm px-2 text-white font-bold cursor-pointer ml-4 shadow-md hover:scale-105 transition-all duration-300 w-20 active:scale-100" >Add</button>
        </div>
        <div className="mt-2 text-white">
           My Task
        </div>

        <div className=" mt-5  w-full p-4">
            <div className="bg-neutral-700 w-full size-10 flex justify-between">  
            taks

            </div>
        </div>
        </div>
    </div>
}


export function TodoPage(){
    return <div className="h-screen w-screen bg-gray-300 relative flex justify-center p-6">
        <div className="text-3xl font-medium flex flex-col items-center h-auto w-96  rounded-2xl shadow-md bg-gray-500">
        <h1 className="text-3xl font-medium mt-5">
            Mytodo
        </h1> 
        <div className="flex mt-5 items-center justify-between">
            <input type="text" placeholder="add your  todo"  className="border border-amber-700 focus:outline-none text-sm rounded-md bg-white text-emerald-600  px-4 py-2"/>
            <button className="bg-red-500 h-10 rounded-md w-1/2 text-sm px-4 py-1 text-white cursor-pointer ml-4 shadow-md hover:scale-105 transition-all duration-300 active:scale-100">Add</button>
        </div>
        <div className="mt-2">
            my tasks
        </div>

        <div className="bg-blue-300 mt-5  w-full p-4">
            <div className="bg-green-700 w-full size-10 flex justify-between"> 
                <span className="text-md text-white ml-2">
                    tasks 
                </span>
                <input type="checkbox" name="sd" id="ad" className="rounded-full border mr-2"/>
            </div>
        </div>
        </div>
    </div>
}
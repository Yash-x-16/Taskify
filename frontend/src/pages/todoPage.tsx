import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../utils/utils"
interface allTodo{
    title:string,
    description?:string,
    isDone:boolean,
    todoId? : number ,
    userId?:null
}

export function TodoPage(){ 
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isDone, setIsdone] = useState(false) 
    const [isClicked,setIsClicked]=useState(false)
    const [editingTodoId,seteditingTodoId]=useState<number | null>(null) 
    const [editingTitle,seteditingTitle]=useState<string|null>(null) ; 
    let [alltodo,SetallTodo]=useState<allTodo[]|[]>() 
   
    async function addTodo(){ 
        try{ 
            if(title===''){
                alert("cannot add empty string") 
                return 
            }
        const response = await axios.post(`${BACKEND_URL}/api/todo/addTodo`,{
            title , 
            description , 
            isDone
        },{headers:{
            token:localStorage.getItem('token') 
        }
             }) 
            console.log(`response from add Todo is :`,response.data)    
            setTitle('') 
        fetchTodo()
        }catch(e){
            console.log(`error in the addTodo function is `,e)
        }
    } 
    async function fetchTodo(){
        try{
        const todos = await axios.get(`${BACKEND_URL}/api/todo/getTodo`,{headers:{
            token:localStorage.getItem('token')
        }
    })
    console.log(todos.data)
    SetallTodo(todos.data.Todos)
    }catch(e){
        console.log(`error in the fetch todo function is `,e)
    }
    }

    async function updateTodo(x: allTodo) {
            try {
                const updated = await axios.put(`${BACKEND_URL}/api/todo/updateTodo`, {
                title: x.title,
                description: x.description,
                isDone: x.isDone,
                todoId: x.todoId
                }, {
                headers: {
                    token: localStorage.getItem('token')
                }
                });

    console.log(updated.data);
  } catch (e) {
    console.log('error in updateTodo:', e);
  }
}
    async function deleteTodo(x:number){
        try{
            const delTodo = await axios.delete(`${BACKEND_URL}/api/todo/deleteTodo`,{
            data:{
                todoId:x
            }
            ,
           headers:{
            token:localStorage.getItem('token')
           } 
        }) 
        fetchTodo()
        console.log(delTodo.data)

        }catch(e){
            console.log('error in the delete function is ',e)
        }
        
    }
    useEffect(()=>{
        fetchTodo()
    },[])

    

    return (
        <div className="h-screen w-screen bg-gray-300 relative flex justify-center p-6">
            <div className="text-3xl font-medium flex flex-col items-center h-auto w-96  rounded-2xl shadow-md bg-gray-500">
                <h1 className="text-3xl font-medium mt-5 text-white">
                    MyTodo 
                </h1>
                <div className="flex mt-5 items-center justify-between">
                    <input
                        type="text"
                        placeholder="add your  todo"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border hover:scale-105 transition-all duration-300 text-lg focus:outline-none  rounded-md bg-white text-emerald-600  px-4 py-1  "
                    />
                    <button
                        className="bg-green-500 h-10 rounded-md  text-sm px-2 text-white font-bold cursor-pointer ml-4 shadow-md hover:scale-105 transition-all duration-300 w-20 active:scale-100"
                        onClick={addTodo}
                    >
                        Add
                    </button>
                </div>
                <div className="mt-2 text-white">
                    My Task
                </div>
                <div className="mt-5 w-full p-4">
                    {alltodo?.map((x,idx)=>
                        {return <div key={idx=Number(x.todoId)}  className="bg-neutral-700 w-full min-h-10 flex items-center justify-between mb-2 rounded px-3 py-2 text-white">
                            {editingTodoId===x.todoId? <input
                                    value={editingTitle ?? ''}
                                    onChange={(e) => seteditingTitle(e.target.value)}
                                    className="text-black px-2 py-1 rounded w-1/2"
                                    /> :<span>{x.title}</span>}
                            
                               
                                <div className="flex  gap-2">
                                   <button
                                onClick={()=>{deleteTodo(Number(x.todoId))}}
                                className="bg-red-400 px-2 py-1 rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer  active:scale-100">
                                delete
                                </button> 


                                {editingTodoId===x.todoId?<button 
                                className="bg-yellow-400 px-3 py-1 text-sm rounded-lg hover:scale-105 active:scale-100 transition-all duration-300 cursor-pointer"
                              onClick={async () => {
                                        if (editingTitle?.trim() === '') {
                                            alert("Todo cannot be empty");
                                            return;
                                        }
                                        await updateTodo({
                                            ...x,
                                            title: editingTitle as string,
                                        });
                                        seteditingTodoId(null);
                                        seteditingTitle(null);
                                        fetchTodo();
                                        }}
                                >save</button>:
                                 <button 
                                 onClick={()=>{
                                    seteditingTitle(x.title) 
                                    seteditingTodoId(Number(x.todoId))
                                 }}
                                className="bg-green-400  px-3 py-1 text-sm rounded-lg hover:scale-105 active:scale-100 transition-all duration-300 cursor-pointer">
                                edit</button>
                                
                                }
                               
                                </div>
                               
                            </div> 
                        })}
                  
                </div>
            </div>
        </div>
    )
}



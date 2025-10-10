import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../utils/utils"

interface allTodo{
    title:string,
    description?:string,
    isDone:boolean
}

export function TodoPage(){ 
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isDone, setIsdone] = useState(false)
    const [allTodos, setAllTodos] = useState<allTodo[]>([])

    // Fetch all todos
    async function fetchTodos() {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/todo/getTodo`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            setAllTodos(response.data.Todos || [])
        } catch (err) {
            console.error("Failed to fetch todos", err)
        }
    }

    // Add a new todo and refresh the list
    async function addtodo() {
        try {
            await axios.post(`${BACKEND_URL}/api/todo/addTodo`, {
                title,
                description,
                isDone,
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            setTitle('')
            setDescription('')
            setIsdone(false)
            fetchTodos()
        } catch (err) {
            console.error("Failed to add todo", err)
        }
    }

    useEffect(() => {
        fetchTodos()
    }, [])

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
                        onClick={addtodo}
                    >
                        Add
                    </button>
                </div>
                <div className="mt-2 text-white">
                    My Task
                </div>
                <div className="mt-5 w-full p-4">
                    {allTodos.length === 0 ? (
                        <div className="text-white text-center">No todos yet.</div>
                    ) : (
                        allTodos.map((x, idx) => (
                            <div key={idx} className="bg-neutral-700 w-full min-h-10 flex items-center justify-between mb-2 rounded px-3 py-2 text-white">
                                <span>{x.title}</span>
                                <span className={x.isDone ? "text-green-400" : "text-red-400"}>
                                    {x.isDone ? "Done" : "Pending"}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}



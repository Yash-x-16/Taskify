import { BrowserRouter, Routes,Route } from "react-router-dom"
import { Signup } from "./pages/signupPage"
import { Signin } from "./pages/signinPage"
import { Todo } from "./pages/todoPage"
function App() {
  return (
    <BrowserRouter>
    <Routes >
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/todo" element={<Todo/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App

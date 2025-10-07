
import './App.css'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import { TodoPage } from './pages/todoPage'
import { Signin } from './pages/signinPage'
import { Signup } from './pages/signupPage'

function App() {


  return (
    <BrowserRouter>
      <Routes>
          <Route element={<TodoPage/>}path='/todo'/>
          <Route element={<Signin/>}path='/signin'/>
          <Route element={<Signup/>}path='/signup'/>
      </Routes>
    </BrowserRouter>
     
  )
}

export default App

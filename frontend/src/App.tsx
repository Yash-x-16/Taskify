
import './App.css'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import { TodoPage } from './pages/todoPage'

function App() {


  return (
    <BrowserRouter>
      <Routes>
          <Route element={<TodoPage/>}path='/todo'/>
      </Routes>
    </BrowserRouter>
     
  )
}

export default App

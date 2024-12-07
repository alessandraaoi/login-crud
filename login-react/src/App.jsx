import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Gestor from './components/Gestor'

function App() {

  return (
    <BrowserRouter>

    <>
     
     <Routes>

      <Route path = '/' element = {<Login/>}   />
      <Route path = '/gestor' element = {<Gestor/>}   />

     </Routes>

    </>
    
    </BrowserRouter>
  )
}

export default App

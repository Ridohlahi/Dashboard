import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Navbar from "./compo/navbar/Navbar"
import Form from "./components/form/Form"
import Data from "./components/data/data"

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Form/>}/>
          <Route path="/data" element={<Data/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

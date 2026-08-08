import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing"
import Register from "./pages/Register";
import Login from "./pages/Login";
const App = ()=>{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<h1>Dashboard</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
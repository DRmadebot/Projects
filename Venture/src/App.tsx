import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing"

const App = ()=>{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<h1>Login page</h1>}/>
        <Route path="/dashboard" element={<h1>Dashboard</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
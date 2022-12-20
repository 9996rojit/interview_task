
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './Hoc/protectedRoute'
import CreateVaccine from './pages/createVaccine'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import Missing from './pages/missing'
import Register from './pages/register'

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-vaccine" element={<CreateVaccine />} />
        <Route path="/edit-vaccine/:id" element={<CreateVaccine />} />
      </Route>
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route />
      <Route path="*" element={<Missing/>}/>
    </Routes>
    </BrowserRouter>
   
  )
}

export default App

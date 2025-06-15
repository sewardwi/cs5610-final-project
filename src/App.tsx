import Home from './Home'
import Profile from './Profile';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route /* Home Page */ path="/" element={<Navigate to="home"/>} />
        <Route /* Home Page */ path="/home" element={<Home/>} />
        <Route /* Profile Page */ path="/profile" element={<Profile/>} />
      </Routes>
    </HashRouter>
  )
}

export default App

import Home from './Home'
import Profile from './Profile';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import Search from './Search';

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route /* Home Page */ path="/" element={<Navigate to="home"/>} />
        <Route /* Home Page */ path="/home" element={<Home/>} />
        <Route /* Profile Page */ path="/profile" element={<Profile/>} />
        <Route /* Search Page */ path="/search/*" element={<Search />} />
      </Routes>
    </HashRouter>
  )
}

export default App;
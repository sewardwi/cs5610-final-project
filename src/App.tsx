import Home from './Home'
import Profile from './Profile';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import Search from './Search';
import Details from './Details';

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route /* Home Page */ path="/" element={<Navigate to="home"/>} />
        <Route /* Home Page */ path="/home" element={<Home/>} />
        <Route /* Profile Page */ path="/profile" element={<Profile/>} />
        <Route /* Search Page (with Param) */ path="/search/:movie" element={<Search />} />
        <Route /* Search Page (no Param) */ path="/search" element={<Search />} />
        <Route /* Details (with Param) */ path="/details/:movieName" element={<Details />} />
        <Route /* Details (no Param) */ path="/details" element={<Details />} />
      </Routes>
    </HashRouter>
  )
}

export default App;
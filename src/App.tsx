import Home from './Home'
import Profile from './Profile';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import Search from './Search';
import Details from './Details';
import Login from './Login';
import OthersProfile from './OthersProfile';
import ProtectedRoute from './ProtectedRoute';
import Team from './Team';

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route /* Home Page */ path="/" element={<Navigate to="home"/>} />
        <Route /* Home Page */ path="/home" element={<Home/>} />
        <Route path="/profile/*" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
        <Route /* Other users profile Page */ path="/otherprofile/:uid/*" element={<OthersProfile/>} />
        <Route /* Login Page */ path="/login" element={<Login/>} />
        <Route /* Search Page (with Param) */ path="/search/:movie" element={<Search />} />
        <Route /* Search Page (no Param) */ path="/search" element={<Search />} />
        <Route /* Details (with Param) */ path="/details/:movieName" element={<Details />} />
        <Route /* Details (no Param) */ path="/details" element={<Details />} />
        <Route /* Team Details */ path="/team" element={<Team />} />
      </Routes>
    </HashRouter>
  )
}

export default App;
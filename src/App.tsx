import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './HomePage'
import './App.css'
import Search from './Search';
import Details from "./Details";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/details/:movieName" element={<Details />} />
      </Routes>
    </HashRouter>
  )
}

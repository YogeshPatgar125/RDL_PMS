import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"
import Navbar from "./components/Navbar";
import Projects from "./pages/Projects";
import Employees from "./pages/Employees";
import Report from "./pages/Report";
import Register from "./pages/Register";
import TL_Navbar from "./components/TL_Navbar";
import Em_Navbar from "./components/Em_Navbar";



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/employees" element= {<Employees/>}/>
        <Route path="/reports" element={<Report />} />
        <Route path="/tlnavbar" element={<TL_Navbar/>} />
        <Route path="/emnavbar" element={<Em_Navbar/>} />
      </Routes>
    </Router>
  );
}

export default App;

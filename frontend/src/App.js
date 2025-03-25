import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login/>} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

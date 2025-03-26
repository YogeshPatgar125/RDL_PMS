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
import LeadNav from "./components/TL_Navbar";
import EmNav from "./components/Em_Navbar";
import Assign from "./pages/Assign_Lead"
import Cancel from "./pages/Cancel"
import Pending from "./pages/Pending"
import ReportIssueTable from "./pages/Complaint"
import DailyUpdateForm from "./pages/Dailyupdate"
import Em_Dashboard from "./pages/Em_Dashboard";
import TL_Dashboard from "./pages/Tl_Dashboard";


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
        <Route path="/tl_navbar" element={<LeadNav/>} />
        <Route path="/em_navbar" element={<EmNav/>} />
        <Route path="/assign" element={<Assign/>} />
        <Route path="/cancel" element={<Cancel/>} />
        <Route path="/pending" element={<Pending/>} />
        <Route path="/complaint" element ={<ReportIssueTable />} />
        <Route path="/dailyupdate" element ={<DailyUpdateForm/>}/>
        <Route path="/em_dashboard" element ={<Em_Dashboard/>}/>
        <Route path="/tl_dashboard" element ={<TL_Dashboard/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;

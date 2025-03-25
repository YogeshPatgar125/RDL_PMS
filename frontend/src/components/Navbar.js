import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Login from "../pages/Login";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(<Login/>);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(145deg, #69b1ff, #93c5fd)",
        color: "black",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        borderRadius: "0 0 15px 15px",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
        
        {/* Logo / Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "white",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Project Management System
        </Typography>

        {/* Navigation Buttons (No Mapping) */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button
            component={Link}
            to="/dashboard"
            sx={{
              color: location.pathname === "/dashboard" ? "black" : "#ffffffcc",
              textTransform: "capitalize",
              fontSize: "1.1rem",
              padding: "8px 16px",
              borderRadius: "10px",
              transition: "0.3s",
              "&:hover": {
                color: "black",
                backgroundColor: "#ffffff50",
              },
            }}
          >
            Dashboard
          </Button>

          <Button
            component={Link}
            to="/projects"
            sx={{
              color: location.pathname === "/projects" ? "black" : "#ffffffcc",
              textTransform: "capitalize",
              fontSize: "1.1rem",
              padding: "8px 16px",
              borderRadius: "10px",
              transition: "0.3s",
              "&:hover": {
                color: "black",
                backgroundColor: "#ffffff50",
              },
            }}
          >
            Projects
          </Button>

          <Button
            component={Link}
            to="/employees"
            sx={{
              color: location.pathname === "/employees" ? "black" : "#ffffffcc",
              textTransform: "capitalize",
              fontSize: "1.1rem",
              padding: "8px 16px",
              borderRadius: "10px",
              transition: "0.3s",
              "&:hover": {
                color: "black",
                backgroundColor: "#ffffff50",
              },
            }}
          >
            Employees
          </Button>

          <Button
            component={Link}
            to="/reports"
            sx={{
              color: location.pathname === "/reports" ? "black" : "#ffffffcc",
              textTransform: "capitalize",
              fontSize: "1.1rem",
              padding: "8px 16px",
              borderRadius: "10px",
              transition: "0.3s",
              "&:hover": {
                color: "black",
                backgroundColor: "#ffffff50",
              },
            }}
          >
            Reports
          </Button>
        </Box>

        {/* Logout Button */}
        <IconButton 
          onClick={handleLogout()} 
          sx={{ 
            color: "white", 
            backgroundColor: "#ffffff30", 
            "&:hover": { backgroundColor: "#ffffff50" } 
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

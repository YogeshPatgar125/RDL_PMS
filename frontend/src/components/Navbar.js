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

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Projects", path: "/projects" },
    { label: "Employees", path: "/employees" },
    { label: "Reports", path: "/reports" },
    {label:"", path: "/login"}
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#69b1ff",
        color: "black",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "white",
            textTransform: "uppercase",
          }}
        >
          Project Management System
        </Typography>

        <Box sx={{ display: "flex", gap: 4 }}>
          {navItems.map((item, index) => (
            <Button
              key={index}
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? "black" : "#00000099",
                fontWeight: location.pathname === item.path ? "bold" : "normal",
                textTransform: "capitalize",
                fontSize: "1rem",
                "&:hover": {
                  color: "black",
                  backgroundColor: "#ffffff50",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        <IconButton onClick={handleLogout} sx={{ color: "black" }}>

          <LogoutIcon />

        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

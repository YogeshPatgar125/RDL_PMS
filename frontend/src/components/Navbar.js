import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reportAnchor, setReportAnchor] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleReportClick = (event) => {
    setReportAnchor(event.currentTarget);
  };

  const handleReportClose = () => {
    setReportAnchor(null);
  };

  const navLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Projects", path: "/projects" },
    { label: "Employees", path: "/employees" },
  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(145deg, #69b1ff, #93c5fd)",
          color: "black",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          borderRadius: "0 0 15px 15px",
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center", px: 2 }}>
          
          {/* Menu Icon for Mobile View */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setSidebarOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Title */}
          {!isMobile && (
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
          )}

          {/* Navigation Buttons for Desktop */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3, marginLeft: "auto" }}>
              {navLinks.map((nav) => (
                <Button
                  key={nav.label}
                  component={Link}
                  to={nav.path}
                  sx={{
                    color: location.pathname === nav.path ? "black" : "#ffffffcc",
                    textTransform: "capitalize",
                    fontSize: "1.1rem",
                    padding: "8px 16px",
                    borderRadius: "10px",
                    transition: "0.3s",
                    "&:hover": { color: "black", backgroundColor: "#ffffff50" },
                  }}
                >
                  {nav.label}
                </Button>
              ))}

              {/* Reports Dropdown */}
              <Button
                onClick={handleReportClick}
                sx={{
                  color: location.pathname.startsWith("/report") ? "black" : "#ffffffcc",
                  textTransform: "capitalize",
                  fontSize: "1.1rem",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  transition: "0.3s",
                  "&:hover": { color: "black", backgroundColor: "#ffffff50" },
                }}
                endIcon={<ArrowDropDownIcon />}
              >
                Reports
              </Button>

              <Menu
                anchorEl={reportAnchor}
                open={Boolean(reportAnchor)}
                onClose={handleReportClose}
              >
                <MenuItem onClick={() => { navigate("/complete"); handleReportClose(); }}>Complete</MenuItem>
                <MenuItem onClick={() => { navigate("/pending"); handleReportClose(); }}>Pending</MenuItem>
                <MenuItem onClick={() => { navigate("/cancel"); handleReportClose(); }}>Cancel</MenuItem>
              </Menu>
            </Box>
          )}

          {/* Logout Button */}
          <IconButton
            onClick={handleLogout}
            sx={{
              color: "white",
              backgroundColor: "#ffffff30",
              "&:hover": { backgroundColor: "#ffffff50" },
              marginLeft: isMobile ? "auto" : "20px",
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar for Mobile View */}
      <Drawer anchor="left" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <Box sx={{ width: 250, padding: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>Project Management System</Typography>
          <List>
            {navLinks.map((nav) => (
              <ListItem button component={Link} to={nav.path} key={nav.label} onClick={() => setSidebarOpen(false)}>
                <ListItemText primary={nav.label} />
              </ListItem>
            ))}

            {/* Reports Dropdown in Sidebar */}
            <ListItem button onClick={handleReportClick}>
              <ListItemText primary="Reports" />
            </ListItem>
            <Menu
              anchorEl={reportAnchor}
              open={Boolean(reportAnchor)}
              onClose={handleReportClose}
            >
              <MenuItem onClick={() => { navigate("/complete"); handleReportClose(); }}>Complete</MenuItem>
              <MenuItem onClick={() => { navigate("/pending"); handleReportClose(); }}>Pending</MenuItem>
              <MenuItem onClick={() => { navigate("/cancel"); handleReportClose(); }}>Cancel</MenuItem>
            </Menu>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;

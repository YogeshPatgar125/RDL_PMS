// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   IconButton,
//   useMediaQuery,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import LogoutIcon from "@mui/icons-material/Logout";
// import MenuIcon from "@mui/icons-material/Menu";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import NotificationsIcon from "@mui/icons-material/Notifications";

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [reportAnchor, setReportAnchor] = useState(null);
//   const [userRole, setUserRole] = useState("");

//   // Detect user role based on pathname
//   useEffect(() => {
//     if (location.pathname.includes("/addashboard")) {
//       setUserRole("admin");
//     } else if (location.pathname.includes("/tldashboard")) {
//       setUserRole("teamleader");
//     } else if (location.pathname.includes("/emdashboard")) {
//       setUserRole("employee");
//     }
//   }, [location.pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/");
//   };

//   const handleReportClick = (event) => {
//     setReportAnchor(event.currentTarget);
//   };

//   const handleReportClose = () => {
//     setReportAnchor(null);
//   };

//   // Define Navigation Links Based on Role
//   const navLinks = {
//     admin: [
//       { label: "Dashboard", path: "/addashboard" },
//       { label: "Projects", path: "/addproject" },
//      // { label: "Employees", path: "/assign" },
//     ],
//     teamleader: [
//       { label: "Dashboard", path: "/tldashboard" },
//       { label: "Team Projects", path: "/team-projects" },
//       { label: "Team Members", path: "/team-members" },
//     ],
//     employee: [
//       { label: "Dashboard", path: "/emdashboard" },
//       { label: "Projects", path: "/projects" },
//       { label: "My Tasks", path: "/update" },
//       { label: "Issues", path: "/complaint" },
//     ],
//   };

//   return (
//     <>
//       <AppBar
//         position="sticky" // Changed from "static" to "sticky"
//         sx={{
//           background: "linear-gradient(145deg, #69b1ff, #93c5fd)",
//           color: "black",
//           boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
//           borderRadius: "0 0 15px 15px",
//           top: 0, // Ensures it stays at the top
//           zIndex: 1100, // Ensures it appears above other content
//         }}
//       >

//         <Toolbar sx={{ display: "flex", alignItems: "center", px: 2 }}>
//           {/* Menu Icon for Mobile View */}
//           {isMobile && (
//             <IconButton
//               edge="start"
//               color="inherit"
//               onClick={() => setSidebarOpen(true)}
//               sx={{ mr: 2 }}
//             >
//               <MenuIcon />
//             </IconButton>
//           )}

//           {/* Title */}
//           {!isMobile && (
//             <Typography
//               variant="h5"
//               sx={{
//                 fontWeight: "bold",
//                 color: "white",
//                 textTransform: "uppercase",
//                 letterSpacing: 1,
//               }}
//             >
//               PROJECT MANAGEMENT SYSTEM
//             </Typography>
//           )}

//           {/* Navigation Buttons for Desktop */}
//           {!isMobile && (
//             <Box sx={{ display: "flex", gap: 3, marginLeft: "auto" }}>
//               {navLinks[userRole]?.map((nav) => (
//                 <Button
//                   key={nav.label}
//                   component={Link}
//                   to={nav.path}
//                   sx={{
//                     color: location.pathname === nav.path ? "black" : "#ffffffcc",
//                     textTransform: "capitalize",
//                     fontSize: "1.1rem",
//                     padding: "8px 16px",
//                     borderRadius: "10px",
//                     transition: "0.3s",
//                     "&:hover": { color: "black", backgroundColor: "#ffffff50" },
//                   }}
//                 >
//                   {nav.label}
//                 </Button>
//               ))}

//               {/* Reports Dropdown (Only for Admin & Team Lead) */}
//               {(userRole === "admin" || userRole === "teamleader") && (
//                 <Button
//                   onClick={handleReportClick}
//                   sx={{
//                     color: location.pathname.startsWith("/report") ? "black" : "#ffffffcc",
//                     textTransform: "capitalize",
//                     fontSize: "1.1rem",
//                     padding: "8px 16px",
//                     borderRadius: "10px",
//                     transition: "0.3s",
//                     "&:hover": { color: "black", backgroundColor: "#ffffff50" },
//                   }}
//                   endIcon={<ArrowDropDownIcon />}
//                 >
//                   Reports
//                 </Button>
//               )}

//               <Menu
//                 anchorEl={reportAnchor}
//                 open={Boolean(reportAnchor)}
//                 onClose={handleReportClose}
//               >
//                 <MenuItem onClick={() => { navigate("/complete"); handleReportClose(); }}>Complete</MenuItem>
//                 <MenuItem onClick={() => { navigate("/pending"); handleReportClose(); }}>Pending</MenuItem>
//                 <MenuItem onClick={() => { navigate("/cancel"); handleReportClose(); }}>Cancel</MenuItem>
//               </Menu>
//             </Box>
//           )}
//           <IconButton
//       sx={{
//         color: "white",
//         backgroundColor: "#ffffff30",
//         "&:hover": { backgroundColor: "#ffffff50" },
//         marginLeft: "20px",
//       }}
//     >
//       <NotificationsIcon />
//     </IconButton>

//           {/* Logout Button */}
//           <IconButton
//             onClick={handleLogout}
//             sx={{
//               color: "white",
//               backgroundColor: "#ffffff30",
//               "&:hover": { backgroundColor: "#ffffff50" },
//               marginLeft: isMobile ? "auto" : "20px",
//             }}
//           >
//             <LogoutIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       {/* Sidebar for Mobile View */}
//       <Drawer anchor="left" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
//         <Box sx={{ width: 250, padding: 2 }}>
//           <Typography sx={{ fontWeight: "bold" }}>{userRole} Dashboard</Typography>
//           <List>
//             {navLinks[userRole]?.map((nav) => (
//               <ListItem button component={Link} to={nav.path} key={nav.label} onClick={() => setSidebarOpen(false)}>
//                 <ListItemText primary={nav.label} />
//               </ListItem>
//             ))}

//             {/* Reports Dropdown in Sidebar */}
//             {(userRole === "admin" || userRole === "teamleader") && (
//               <>
//                 <ListItem button onClick={handleReportClick}>
//                   <ListItemText primary="Reports" />
//                 </ListItem>
//                 <Menu
//                   anchorEl={reportAnchor}
//                   open={Boolean(reportAnchor)}
//                   onClose={handleReportClose}
//                 >
//                   <MenuItem onClick={() => { navigate("/complete"); handleReportClose(); }}>Complete</MenuItem>
//                   <MenuItem onClick={() => { navigate("/pending"); handleReportClose(); }}>Pending</MenuItem>
//                   <MenuItem onClick={() => { navigate("/cancel"); handleReportClose(); }}>Cancel</MenuItem>
//                 </Menu>
//               </>
//             )}
//           </List>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from "react";
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
  MenuItem,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reportAnchor, setReportAnchor] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleReportClick = (event) => {
    setReportAnchor(event.currentTarget);
  };

  const handleReportClose = () => {
    setReportAnchor(null);
  };

  const navLinks = {
    admin: [
      { label: "Dashboard", path: "/addashboard" },
      { label: "Projects", path: "/addproject" },
    ],
    teamleader: [
      { label: "Dashboard", path: "/tldashboard" },
      { label: "Team Projects", path: "/team-projects" },
      { label: "Team Members", path: "/team-members" },
    ],
    employee: [
      { label: "Dashboard", path: "/emdashboard" },
      { label: "Projects", path: "/projects" },
      { label: "My Tasks", path: "/update" },
      { label: "Issues", path: "/complaint" },
    ],
  };

  return (
    <>
      <AppBar position="sticky" sx={{ background: "linear-gradient(145deg, #69b1ff, #93c5fd)", color: "black" }}>
        <Toolbar sx={{ display: "flex", alignItems: "center", px: 2 }}>
          {isMobile && (
            <IconButton edge="start" color="inherit" onClick={() => setSidebarOpen(true)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}

          {!isMobile && (
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
              PROJECT MANAGEMENT SYSTEM
            </Typography>
          )}

          {!isMobile && isLoggedIn && (
            <Box sx={{ display: "flex", gap: 3, marginLeft: "auto" }}>
              {navLinks[userRole]?.map((nav) => (
                <Button
                  key={nav.label}
                  component={Link}
                  to={nav.path}
                  sx={{ color: "#ffffffcc", textTransform: "capitalize" }}
                >
                  {nav.label}
                </Button>
              ))}

              {(userRole === "admin" || userRole === "teamleader") && (
                <Button onClick={handleReportClick} sx={{ color: "#ffffffcc" }} endIcon={<ArrowDropDownIcon />}>
                  Reports
                </Button>
              )}

              <Menu anchorEl={reportAnchor} open={Boolean(reportAnchor)} onClose={handleReportClose}>
                <MenuItem onClick={() => { navigate("/complete"); handleReportClose(); }}>Complete</MenuItem>
                <MenuItem onClick={() => { navigate("/pending"); handleReportClose(); }}>Pending</MenuItem>
                <MenuItem onClick={() => { navigate("/cancel"); handleReportClose(); }}>Cancel</MenuItem>
              </Menu>
            </Box>
          )}

          {isLoggedIn && (
            <>
              <IconButton sx={{ color: "white", marginLeft: "20px" }}>
                <NotificationsIcon />
              </IconButton>
              <IconButton onClick={handleLogout} sx={{ color: "white", marginLeft: "20px" }}>
                <LogoutIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <Box sx={{ width: 250, padding: 2 }}>
          <Typography sx={{ fontWeight: "bold" }}>{userRole} Dashboard</Typography>
          <List>
            {navLinks[userRole]?.map((nav) => (
              <ListItem button component={Link} to={nav.path} key={nav.label} onClick={() => setSidebarOpen(false)}>
                <ListItemText primary={nav.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;

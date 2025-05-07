// import React, { useState, useEffect } from "react";
// import { Box, Card, CardContent, Typography, Button, Grid } from "@mui/material";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { getAssignedProjects } from "../api/api";

// const EmProject = () => {
//   const [projects, setProjects] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAssignedProjects = async () => {
//       try {
//         const userId = localStorage.getItem("userId");
//         const role = localStorage.getItem("role"); // "employee" or "teamleader"
  
//         const fetchedProjects = await getAssignedProjects(userId, role);
//         setProjects(fetchedProjects);
//       } catch (error) {
//         console.error("Error fetching assigned projects:", error);
//       }
//     };
  
//     fetchAssignedProjects();
//   }, []);
  

//   const handleViewDetailsClick = (projectId) => {
//     const role = localStorage.getItem("role");
  
//     if (role === "teamleader") {
//       navigate(`/teamleadproject/${projectId}`);
//     } else {
//       navigate(`/projectdetails/${projectId}`);
//     }
//   };
  
//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #E3F2FD, #BBDEFB)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "flex-start",
//         paddingTop: "60px",
//       }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           color="#1565C0"
//           mb={3}
//           sx={{ textShadow: "2px 2px 10px rgba(0,0,0,0.2)" }}
//         >
//           Assigned Projects
//         </Typography>
//       </motion.div>

//       <Grid container spacing={3} justifyContent="center" sx={{ width: "80%" }}>
//         {projects.map((project) => (
//           <Grid item xs={12} sm={6} md={4} key={project._id}>
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }}>
//               <Card
//                 sx={{
//                   background: "rgba(255, 255, 255, 0.3)",
//                   backdropFilter: "blur(15px)",
//                   borderRadius: "15px",
//                   padding: "20px",
//                   boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
//                   transition: "0.3s ease-in-out",
//                   minHeight: "180px",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6" fontWeight="bold" textAlign="center" color="#0D47A1">
//                     {project.projectName}
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     sx={{
//                       backgroundColor: "#1565C0",
//                       color: "white",
//                       marginTop: "15px",
//                       fontWeight: "bold",
//                       boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
//                       transition: "0.3s ease-in-out",
//                       "&:hover": {
//                         backgroundColor: "#0D47A1",
//                       },
//                     }}
//                     fullWidth
//                     onClick={() => handleViewDetailsClick(project._id)}
//                   >
//                     View Details
//                   </Button>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default EmProject;





// import React, { useState, useEffect } from "react";
// import { Box, Card, CardContent, Typography, Button, Grid } from "@mui/material";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { getAssignedProjects } from "../api/api";

// const EmProject = () => {
//   const [projects, setProjects] = useState([]);
//   const navigate = useNavigate();
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     const fetchAssignedProjects = async () => {
//       try {
//         const userId = localStorage.getItem("userId");
//         const storedRole = localStorage.getItem("role");
//         setRole(storedRole); // Save role in state
        
//         const fetchedProjects = await getAssignedProjects(userId, storedRole);
//         setProjects(fetchedProjects);
//       } catch (error) {
//         console.error("Error fetching assigned projects:", error);
//       }
//     };

//     fetchAssignedProjects();
//   }, []);

//   const handleViewDetailsClick = (projectId) => {
//     if (role === "teamleader") {
//       navigate(`/teamleadproject/${projectId}`);
//     } else {
//       navigate(`/projectdetails/${projectId}`);
//     }
//   };

//   const handleReportClick = (projectId) => {
//     navigate(`/project-report/${projectId}`);
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #E3F2FD, #BBDEFB)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "flex-start",
//         paddingTop: "60px",
//       }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           color="#1565C0"
//           mb={3}
//           sx={{ textShadow: "2px 2px 10px rgba(0,0,0,0.2)" }}
//         >
//           Assigned Projects
//         </Typography>
//       </motion.div>

//       <Grid container spacing={3} justifyContent="center" sx={{ width: "80%" }}>
//         {projects.map((project) => (
//           <Grid item xs={12} sm={6} md={4} key={project._id}>
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }}>
//               <Card
//                 sx={{
//                   background: "rgba(255, 255, 255, 0.3)",
//                   backdropFilter: "blur(15px)",
//                   borderRadius: "15px",
//                   padding: "20px",
//                   boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
//                   transition: "0.3s ease-in-out",
//                   minHeight: "220px",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6" fontWeight="bold" textAlign="center" color="#0D47A1">
//                     {project.projectName}
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     sx={{
//                       backgroundColor: "#1565C0",
//                       color: "white",
//                       marginTop: "15px",
//                       fontWeight: "bold",
//                       boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
//                       "&:hover": {
//                         backgroundColor: "#0D47A1",
//                       },
//                     }}
//                     fullWidth
//                     onClick={() => handleViewDetailsClick(project._id)}
//                   >
//                     View Details
//                   </Button>
                  
//                   {role === "teamleader" && (
//                     <Button
//                       variant="outlined"
//                       sx={{
//                         marginTop: "10px",
//                         fontWeight: "bold",
//                         borderColor: "#0D47A1",
//                         color: "#0D47A1",
//                         "&:hover": {
//                           borderColor: "#1565C0",
//                           backgroundColor: "#E3F2FD",
//                         },
//                       }}
//                       fullWidth
//                       onClick={() => handleReportClick(project._id)}
//                     >
//                       Report
//                     </Button>
//                   )}
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default EmProject;



import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getAssignedProjects } from "../api/api";
import SearchIcon from "@mui/icons-material/Search";

const EmProject = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignedProjects = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const storedRole = localStorage.getItem("role");
        setRole(storedRole);

        const fetchedProjects = await getAssignedProjects(userId, storedRole);
        setProjects(fetchedProjects);
        setFilteredProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching assigned projects:", error);
      }
    };

    fetchAssignedProjects();
  }, []);

  const handleViewDetailsClick = (projectId) => {
    if (role === "teamleader") {
      navigate(`/teamleadproject/${projectId}`);
    } else {
      navigate(`/projectdetails/${projectId}`);
    }
  };

  const handleReportClick = (projectId) => {
    navigate(`/project-report/${projectId}`);
  };

  const handleSearch = () => {
    const filtered = projects.filter((project) =>
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #E3F2FD, #BBDEFB)",
        padding: "60px 20px 20px 20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          mb={3}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#1565C0"
            sx={{ textShadow: "2px 2px 10px rgba(0,0,0,0.2)" }}
          >
            Assigned Projects
          </Typography>

          <Box display="flex" gap={1} mt={{ xs: 2, sm: 0 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search Projects"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ backgroundColor: "#fff", borderRadius: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                backgroundColor: "#1565C0",
                color: "white",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#0D47A1",
                },
              }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </motion.div>

      <Grid container direction="column" spacing={2} alignItems="center">
        {filteredProjects.map((project) => (
          <Grid item key={project._id} sx={{ width: "100%", maxWidth: "900px" }}>
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: "10px",
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                <Typography variant="h6" fontWeight="bold" color="#0D47A1">
                  {project.projectName}
                </Typography>

                <Box display="flex" gap={2} mt={{ xs: 2, sm: 0 }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#1565C0",
                      color: "white",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#0D47A1",
                      },
                    }}
                    onClick={() => handleViewDetailsClick(project._id)}
                  >
                    View Details
                  </Button>

                  {role === "teamleader" && (
                    <Button
                      variant="outlined"
                      sx={{
                        fontWeight: "bold",
                        borderColor: "#0D47A1",
                        color: "#0D47A1",
                        "&:hover": {
                          borderColor: "#1565C0",
                          backgroundColor: "#E3F2FD",
                        },
                      }}
                      onClick={() => handleReportClick(project._id)}
                    >
                      Report
                    </Button>
                  )}
                </Box>
              </Box>

              <Divider sx={{ marginTop: 2 }} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EmProject;

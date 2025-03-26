import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../components/Navbar";

const allProjects = [
    { id: 1, name: "Website Redesign", leader: "Alice", dueDate: "25 Mar 2025" },
    { id: 2, name: "Mobile App Development", leader: "Bob", dueDate: "30 Mar 2025" },
    { id: 3, name: "Marketing Campaign", leader: "Charlie", dueDate: "18 Mar 2025" },
    { id: 4, name: "CRM Integration", leader: "David", dueDate: "28 Mar 2025" },
    { id: 5, name: "Security Audit", leader: "Eva", dueDate: "5 Apr 2025" },
    { id: 6, name: "Cloud Migration", leader: "Frank", dueDate: "10 Apr 2025" },
    { id: 7, name: "New Feature Rollout", leader: "Grace", dueDate: "15 Apr 2025" },
    { id: 8, name: "Data Analytics Dashboard", leader: "Hannah", dueDate: "20 Apr 2025" },
    { id: 9, name: "E-Commerce Platform", leader: "Ian", dueDate: "25 Apr 2025" },
    { id: 10, name: "AI Chatbot Implementation", leader: "Jack", dueDate: "30 Apr 2025" },
    { id: 11, name: "Blockchain Integration", leader: "Kate", dueDate: "5 May 2025" },
    { id: 12, name: "Cybersecurity Enhancement", leader: "Leo", dueDate: "10 May 2025" }
  ];
  

const PendingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset pagination when searching
  };

  // Filter projects based on search term
  const filteredProjects = allProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.leader.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // Handlers for next and previous buttons
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <Navbar />
      
      {/* Search Bar */}
      <Box display="flex" justifyContent="flex-end" mt={2} mr={3}>
        <TextField
          label="Search Project"
          variant="outlined"
          size="small"
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Table Container */}
      <TableContainer
        component={Paper}
        sx={{
          margin: "auto",
          width: "90%",
          borderRadius: 2,
          boxShadow: 3,
          overflowX: "auto",
          mt: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#0288D1" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sl.No</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Project Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Leader</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Due Date</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProjects.length > 0 ? (
              currentProjects.map((project, index) => (
                <TableRow
                  key={indexOfFirstProject + index} // Unique key
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#E3F2FD" : "white",
                    "&:hover": { backgroundColor: "#BBDEFB" },
                  }}
                >
                  <TableCell>{indexOfFirstProject + index + 1}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.leader}</TableCell>
                  <TableCell>{project.dueDate}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" size="small">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No projects found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        <Button
          variant="contained"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          sx={{ mx: 1 }}
        >
          Previous
        </Button>

        <Typography variant="body1">
          Page {currentPage} of {totalPages}
        </Typography>

        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          sx={{ mx: 1 }}
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

export default PendingPage;

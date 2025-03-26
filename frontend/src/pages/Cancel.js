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
  Typography,
  TextField,
  InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../components/Navbar";

const cancelledProjects = [
  { id: 1, name: "Website Redesign", leader: "Alice" },
  { id: 2, name: "Mobile App Development", leader: "Bob" },
  { id: 3, name: "Marketing Campaign", leader: "Charlie" },
  { id: 4, name: "CRM Integration", leader: "David" },
  { id: 5, name: "Security Audit", leader: "Eva" },
  { id: 6, name: "Cloud Migration", leader: "Frank" },
  { id: 7, name: "New Feature Rollout", leader: "Grace" },
  { id: 8, name: "Data Analytics Dashboard", leader: "Hannah" },
  { id: 9, name: "E-Commerce Platform", leader: "Ian" },
  { id: 10, name: "AI Chatbot Implementation", leader: "Jack" }
];

const CancelPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5; // Displaying 5 per page

  // Filter projects based on search term
  const filteredProjects = cancelledProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.leader.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // Handlers
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

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
          mt: 3,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#D32F2F" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sl.No</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Project Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Leader</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProjects.length > 0 ? (
              currentProjects.map((project, index) => (
                <TableRow
                  key={project.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#FFEBEE" : "white",
                    "&:hover": { backgroundColor: "#FFCDD2" },
                  }}
                >
                  <TableCell>{indexOfFirstProject + index + 1}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.leader}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" size="small">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No cancelled projects found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={3} mb={3}>
        <Button
          variant="contained"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          sx={{
            mx: 1,
            backgroundColor: "#D32F2F",
            "&:hover": { backgroundColor: "#B71C1C" },
          }}
        >
          Previous
        </Button>

        <Typography variant="body1" sx={{ mx: 2, fontWeight: "bold", color: "#D32F2F" }}>
          Page {currentPage} of {totalPages}
        </Typography>

        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          sx={{
            mx: 1,
            backgroundColor: "#D32F2F",
            "&:hover": { backgroundColor: "#B71C1C" },
          }}
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

export default CancelPage;

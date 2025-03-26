import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    TextField,
    InputAdornment,
    Typography,
    IconButton,
    Button, 
  } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import Navbar from "../components/Navbar";

const completedProjects = [
  { id: 1, name: "Website Redesign", leader: "Alice", completedOn: "25 Mar 2025", reportUrl: "/reports/website-redesign.pdf" },
  { id: 2, name: "Mobile App Development", leader: "Bob", completedOn: "30 Mar 2025", reportUrl: "/reports/mobile-app.pdf" },
  { id: 3, name: "Marketing Campaign", leader: "Charlie", completedOn: "18 Mar 2025", reportUrl: "/reports/marketing-campaign.pdf" },
  { id: 4, name: "CRM Integration", leader: "David", completedOn: "28 Mar 2025", reportUrl: "/reports/crm-integration.pdf" },
  { id: 5, name: "Security Audit", leader: "Eva", completedOn: "5 Apr 2025", reportUrl: "/reports/security-audit.pdf" },
  { id: 6, name: "Cloud Migration", leader: "Frank", completedOn: "10 Apr 2025", reportUrl: "/reports/cloud-migration.pdf" },
];

const Complete = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset pagination when searching
  };

  // Filter projects based on search term
  const filteredProjects = completedProjects.filter(
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

  // Handle PDF download
  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.substring(url.lastIndexOf("/") + 1);
    link.click();
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
            <TableRow sx={{ backgroundColor: "#4CAF50" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sl.No</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Project Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Leader</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Completed On</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentProjects.length > 0 ? (
              currentProjects.map((project, index) => (
                <TableRow
                  key={indexOfFirstProject + index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#E8F5E9" : "white",
                    "&:hover": { backgroundColor: "#C8E6C9" },
                  }}
                >
                  <TableCell>{indexOfFirstProject + index + 1}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.leader}</TableCell>
                  <TableCell>{project.completedOn}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDownload(project.reportUrl)}
                      sx={{
                        color: "#4CAF50",
                        "&:hover": { color: "#388E3C" },
                        transition: "color 0.2s ease",
                      }}
                    >
                      <CloudDownloadOutlinedIcon fontSize="medium" />
                    </IconButton>
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

export default Complete;

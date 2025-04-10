import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
  IconButton, Box, TextField, Button, Grid
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { green, red } from "@mui/material/colors";
const ReportIssueTable = () => {
  const [issues, setIssues] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    dueDate: "",
    description: ""
  });

  // Fetch issues from backend
  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/complaints");
      setIssues(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit new issue
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dueDate || !formData.description) return;

    try {
      await axios.post("http://localhost:5000/api/complaints", formData);
      setFormData({ name: "", dueDate: "", description: "" });
      fetchIssues(); // refresh list
    } catch (err) {
      console.error("Error submitting issue:", err);
    }
  };
  // ...inside ReportIssueTable

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/complaints/${id}`);
    fetchIssues(); // refresh
  } catch (err) {
    console.error("Delete failed:", err);
  }
};

const toggleStatus = async (id) => {
  try {
    await axios.put(`http://localhost:5000/api/complaints/status/${id}`);
    fetchIssues(); // refresh
  } catch (err) {
    console.error("Status toggle failed:", err);
  }
};


  return (
    <Paper elevation={3} sx={{ maxWidth: 900, mx: "auto", mt: 5, p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ bgcolor: "#64b5f6", p: 2, color: "white", borderRadius: 1, mb: 2 }}>
        REPORT ISSUE
      </Typography>

      {/* Issue Submission Form */}
      <Paper sx={{ p: 2, mb: 3 }} elevation={2}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>Add New Issue</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Project Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Due Date"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" sx={{ mt: 1 }}>
                Submit Issue
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Issues Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#00e5ff" }}>
              <TableCell><b>Sl No.</b></TableCell>
              <TableCell><b>Project Name</b></TableCell>
              <TableCell><b>Due Date</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {issues.map((issue, index) => (
            <TableRow key={issue._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{issue.name}</TableCell>
              <TableCell>{issue.dueDate}</TableCell>
              <TableCell>{issue.description}</TableCell>
              <TableCell>
                <Box display="flex" gap={1}>
                  <IconButton
                    sx={{ color: green[500] }}
                    onClick={() => toggleStatus(issue._id)}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton
                    sx={{ color: red[500] }}
                    onClick={() => handleDelete(issue._id)}
                  >
                    <CancelIcon />
                  </IconButton>
                </Box>
                <Typography variant="caption" sx={{ fontStyle: "italic", color: "#777" }}>
                  {issue.status}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ReportIssueTable;

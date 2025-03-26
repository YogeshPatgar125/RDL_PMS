import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { green, red } from "@mui/material/colors";

const issues = [
  { id: 1, name: "Website Redesign", dueDate: "25 Mar 2025", description: "check responsiveness" },
  { id: 2, name: "Mobile App Development", dueDate: "30 Mar 2025", description: "Check the rules of the database" },
  { id: 3, name: "Marketing Campaign", dueDate: "18 Mar 2025", description: "check responsiveness" },
  { id: 4, name: "CRM Integration", dueDate: "28 Mar 2025", description: "check responsiveness" },
  { id: 5, name: "Security Audit", dueDate: "5 Apr 2025", description: "check responsiveness" },
  { id: 6, name: "Data Migration", dueDate: "3 Apr 2025", description: "check responsiveness" },
  { id: 7, name: "AI Chatbot Integration", dueDate: "15 Mar 2025", description: "check responsiveness" },
];

const ReportIssueTable = () => {
  return (
    <Paper elevation={3} sx={{ maxWidth: 800, mx: "auto", mt: 5, p: 2, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ bgcolor: "#64b5f6", p: 2, color: "white", borderRadius: 1 }}>
        REPORT ISSUE
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
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
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>{issue.id}</TableCell>
                <TableCell>{issue.name}</TableCell>
                <TableCell>{issue.dueDate}</TableCell>
                <TableCell>{issue.description}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <IconButton sx={{ color: green[500] }}>
                      <CheckCircleIcon />
                    </IconButton>
                    <IconButton sx={{ color: red[500] }}>
                      <CancelIcon />
                    </IconButton>
                  </Box>
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

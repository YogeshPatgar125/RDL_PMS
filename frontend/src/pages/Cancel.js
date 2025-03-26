import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import Navbar from "../components/Navbar";
const cancelledProjects = [
  { id: 1, name: "Website Redesign", leader: "Alice" },
  { id: 2, name: "Mobile App Development", leader: "Bob" },
  { id: 3, name: "Marketing Campaign", leader: "Charlie" },
  { id: 4, name: "CRM Integration", leader: "David" },
  { id: 5, name: "Security Audit", leader: "Eva" }
];

const CancelPage = () => {
  return (
    <div>
    
    <Navbar/>
   

      <TableContainer component={Paper} sx={{ marginTop: 3, width: "90%", margin: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#80DEEA" }}>
              <TableCell><b>Sl.No</b></TableCell>
              <TableCell><b>Project Name</b></TableCell>
              <TableCell><b>Leader</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cancelledProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.id}</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.leader}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" size="small">Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
};

export default CancelPage;
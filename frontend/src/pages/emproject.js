import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Button, Grid, Collapse } from "@mui/material";
import { motion } from "framer-motion";

const projects = [
  { id: 1, name: "Inventory Management System", description: "A system to track inventory levels, orders, and sales in real-time." },
  { id: 2, name: "Employee Attendance Tracker", description: "A web-based application to monitor employee attendance efficiently." },
  { id: 3, name: "Customer Feedback Portal", description: "A platform for collecting and analyzing customer feedback for business improvement." },
  { id: 4, name: "Task Automation Tool", description: "An AI-driven tool to automate repetitive tasks and improve productivity." },
  { id: 5, name: "HR Management System", description: "A system to manage employee records, payroll, and leave tracking." },
  { id: 6, name: "E-Commerce Analytics", description: "A dashboard that provides insights into sales trends and customer behavior." },
];

const EmProject = () => {
  const [expanded, setExpanded] = useState(null);

  const handleExpandClick = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #E3F2FD, #BBDEFB)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "60px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#1565C0"
          mb={3}
          sx={{ textShadow: "2px 2px 10px rgba(0,0,0,0.2)" }}
        >
          Assigned Projects
        </Typography>
      </motion.div>

      <Grid container spacing={3} justifyContent="center" sx={{ width: "80%" }}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }}>
              <Card
                sx={{
                  background: "rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(15px)",
                  borderRadius: "15px",
                  padding: "20px",
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
                  transition: "0.3s ease-in-out",
                  minHeight: "180px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" textAlign="center" color="#0D47A1">
                    {project.name}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#1565C0",
                      color: "white",
                      marginTop: "15px",
                      fontWeight: "bold",
                      boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
                      transition: "0.3s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#0D47A1",
                      },
                    }}
                    fullWidth
                    onClick={() => handleExpandClick(project.id)}
                  >
                    {expanded === project.id ? "Hide Details" : "View Details"}
                  </Button>

                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: expanded === project.id ? 1 : 0, height: expanded === project.id ? "auto" : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Collapse in={expanded === project.id} timeout="auto" unmountOnExit>
                      <Typography
                        variant="body2"
                        mt={2}
                        sx={{
                          opacity: 0.9,
                          backgroundColor: "rgba(255, 255, 255, 0.5)",
                          padding: "10px",
                          borderRadius: "10px",
                          textAlign: "center",
                          color: "#0D47A1",
                        }}
                      >
                        {project.description}
                      </Typography>
                    </Collapse>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EmProject;

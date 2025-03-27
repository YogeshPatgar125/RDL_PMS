import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

const MyTask = () => {
  const [formData, setFormData] = useState({
    teamLeader: "",
    employee: "",
    taskName: "",
    taskDetails: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f4f8",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 500,
          width: "90%",
          p: 4,
          borderRadius: 3,
          bgcolor: "white",
          boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <Typography
          variant="h5"
          align="center"
          sx={{
            bgcolor: "#1976d2",
            color: "white",
            p: 2,
            borderRadius: "10px 10px 0 0",
            fontWeight: "bold",
          }}
        >
          Daily Task Updates
        </Typography>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Team Leader Name"
            name="teamLeader"
            value={formData.teamLeader}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Employee Name"
            name="employee"
            value={formData.employee}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Task Name"
            name="taskName"
            value={formData.taskName}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Task Details"
            name="taskDetails"
            value={formData.taskDetails}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            variant="outlined"
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              bgcolor: "#2e7d32",
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { bgcolor: "#1b5e20" },
            }}
          >
            Submit Task
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default MyTask;

import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

const DailyUpdateForm = () => {
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
    // You can add form submission logic here (e.g., API call)
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        p: 3,
        borderRadius: 2,
        bgcolor: "#f5f5f5",
      }}
    >
      <Typography variant="h6" sx={{ bgcolor: "#64b5f6", p: 2, color: "white", borderRadius: 1 }}>
        Daily Updates
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Team leader name"
          name="teamLeader"
          value={formData.teamLeader}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Employee name"
          name="employee"
          value={formData.employee}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Task name"
          name="taskName"
          value={formData.taskName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Details of the task update"
          name="taskDetails"
          value={formData.taskDetails}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, bgcolor: "green", ":hover": { bgcolor: "darkgreen" } }}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default DailyUpdateForm;
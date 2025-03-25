import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors when user types
  };

  const validateForm = () => {
    let newErrors = {};

    if (!employee.name.trim()) newErrors.name = "Name is required.";
    if (!employee.email.trim()) newErrors.email = "Email is required.";
    if (!employee.password.trim()) newErrors.password = "Password is required.";
    if (!employee.confirmPassword.trim())
      newErrors.confirmPassword = "Confirm Password is required.";
    if (employee.password !== employee.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!employee.role) newErrors.role = "Please select a role.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Registered:", employee);
      alert("Registered Successfully!");
      setEmployee({ name: "", email: "", password: "", confirmPassword: "", role: "" });
    }
  };

  return (
    <Box
    sx={{
      minHeight: "100vh", // Ensure content can expand
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: "#f4f6f8",
      paddingTop: "80px",
      overflowY: "auto", // Enable scrolling
    }}
  >
  

      {/* Header Section */}
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#3f85f7",
          padding: "15px 20px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
        }}
      >
        <Typography variant="h6" sx={{ color: "white", fontWeight: "bold", textAlign: "left" }}>
          PROJECT MANAGEMENT SYSTEM
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {/* Left Side - Image */}
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <img
              src="/assets/Login.png"
              alt="Project Management"
              style={{ width: "100%", maxWidth: "950px", borderRadius: "10px" }}
            />
          </Grid>

          {/* Right Side - Employee Form */}
          <Grid item xs={12} md={5}>
            <Card elevation={3} sx={{ borderRadius: "10px", p: 3 }}>
              <CardContent>

                {/* Name Field */}
                <TextField
                  fullWidth
                  label="Enter Your Name"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name}
                />

                {/* Email Field */}
                <TextField
                  fullWidth
                  label="Enter Your Email"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email}
                />

                {/* Password Field */}
                <TextField
                  fullWidth
                  type="password"
                  label="Enter Your Password"
                  name="password"
                  value={employee.password}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password}
                />

                {/* Confirm Password Field */}
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm Your Password"
                  name="confirmPassword"
                  value={employee.confirmPassword}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                />

                {/* Role Selection */}
                <FormControl fullWidth margin="normal" error={!!errors.role}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={employee.role}
                    onChange={handleChange}
                    variant="outlined"
                  >
                    <MenuItem value="">Select Role</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Team Lead">Team Lead</MenuItem>
                    <MenuItem value="Employee">Employee</MenuItem>
                  </Select>
                  {errors.role && (
                    <Typography variant="caption" color="error">
                      {errors.role}
                    </Typography>
                  )}
                </FormControl>

                {/* Register Button */}
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, backgroundColor: "#3f85f7" }}
                  onClick={handleSubmit}
                >
                  Register
                </Button>

                {/* Back to Login Button */}
                <Typography textAlign="center" sx={{ mt: 2 }}>
                  <Button
                    sx={{ color: "#3f85f7", textTransform: "none", fontSize: "0.9rem" }}
                    onClick={() => navigate("/")}
                    >
                    Back to Login
                 </Button>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Register;

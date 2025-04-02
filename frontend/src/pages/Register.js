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
import { registerUser } from "../api/api";

const Register = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(""); // Store backend error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError(""); // Clear server errors on input change
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop submission if validation fails

    try {
      const response = await registerUser(employee);
      console.log("Registered:", employee);
      alert("Registration successful! You can now log in.");
      
      // Clear the form after successful registration
      setEmployee({ name: "", email: "", password: "", confirmPassword: "", role: "" });
      setErrors({});
      setServerError("");

      // Redirect to login page after successful registration
      navigate("/");
    } catch (error) {
      setServerError(error.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#f4f6f8",
        paddingTop: "80px",
        overflowY: "auto",
      }}
    >
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
                {/* Display server error if any */}
                {serverError && (
                  <Typography color="error" textAlign="center">
                    {serverError}
                  </Typography>
                )}

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
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="teamleader">Team Lead</MenuItem>
                    <MenuItem value="employee">Employee</MenuItem>
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

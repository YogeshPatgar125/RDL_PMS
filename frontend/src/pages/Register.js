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
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addUser } from "../api/api";

const Register = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    specificRole: "", // Added specificRole field
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{6,}$/;

    if (!employee.name.trim()) newErrors.name = "Name is required.";
    if (!employee.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(employee.email)) newErrors.email = "Invalid email format.";
    if (!employee.password.trim()) newErrors.password = "Password is required.";
    else if (!passwordRegex.test(employee.password))
      newErrors.password = "Password must be 6+ chars and include a number.";
    if (!employee.confirmPassword.trim()) newErrors.confirmPassword = "Confirm Password is required.";
    if (employee.password !== employee.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!employee.role) newErrors.role = "Please select a role.";
    if (employee.role === "employee" && !employee.specificRole)
      newErrors.specificRole = "Please select a specific role for the employee.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userData = {
        name: employee.name,
        email: employee.email,
        password: employee.password,
        role: employee.role,
      };

      if (employee.role === "employee") {
        userData.specificRole = employee.specificRole;
      }

      const response = await addUser(userData);
      console.log("Registered:", response.data);
      alert("Employee added successfully! ");

      setEmployee({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        specificRole: "",
      });
      setErrors({});
      setServerError("");
      navigate("/addashboard");
    } catch (error) {
      console.error("Registration Error:", error);
      setServerError(error.response?.data?.message || "failed. Try again.");
    }
    setLoading(false);
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
          <Grid item xs={12} md={5}>
            <Card elevation={3} sx={{ borderRadius: "10px", p: 3 }}>
              <CardContent>
                {serverError && (
                  <Typography color="error" textAlign="center">
                    {serverError}
                  </Typography>
                )}

                <TextField
                  fullWidth
                  label="Enter Employee Name"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name}
                />

                <TextField
                  fullWidth
                  label="Enter Employee Email"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email}
                />

                <TextField
                  fullWidth
                  type="password"
                  label="Enter Password"
                  name="password"
                  value={employee.password}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password}
                />

                <TextField
                  fullWidth
                  type="password"
                  label="Confirm Password"
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
                  <Select name="role" value={employee.role} onChange={handleChange} variant="outlined">
                    <MenuItem value="">Select Role</MenuItem>
                    <MenuItem value="teamleader">Team Leader</MenuItem>
                    <MenuItem value="employee">Employee</MenuItem>
                  </Select>
                  {errors.role && (
                    <Typography variant="caption" color="error">
                      {errors.role}
                    </Typography>
                  )}
                </FormControl>

                {/* Specific Role Selection (Only if Employee is selected) */}
                {employee.role === "employee" && (
                  <FormControl fullWidth margin="normal" error={!!errors.specificRole}>
                    <InputLabel>Specific Role</InputLabel>
                    <Select name="specificRole" value={employee.specificRole} onChange={handleChange} variant="outlined">
                      <MenuItem value="">Select Specific Role</MenuItem>
                      <MenuItem value="Web Developer">Web Developer</MenuItem>
                      <MenuItem value="App Developer">App Developer</MenuItem>
                      <MenuItem value="Cloud Engineer">Cloud Engineer</MenuItem>
                      <MenuItem value="DevOps">DevOps</MenuItem>
                      <MenuItem value="Tester">Tester</MenuItem>
                    </Select>
                    {errors.specificRole && (
                      <Typography variant="caption" color="error">
                        {errors.specificRole}
                      </Typography>
                    )}
                  </FormControl>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, backgroundColor: "#3f85f7" }}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Register"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Register;

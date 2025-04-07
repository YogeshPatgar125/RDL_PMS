import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
  Box,
  Chip,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllEmployee } from "../api/api";

const AssignEmployeesList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const projectId = location.state?.projectId;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployee();
        setEmployees(data);
      } catch (err) {
        setError("Failed to fetch employees.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleAssign = (employee) => {
    if (!selectedEmployees.find((e) => e._id === employee._id)) {
      setSelectedEmployees((prev) => [...prev, employee]);
    }
  };

  const handleDone = () => {
    navigate(`/assign-employees/${projectId}`, {
      state: { selectedEmployees },
    });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Assign Employees
      </Typography>

      {selectedEmployees.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1">Selected Employees:</Typography>
          <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {selectedEmployees.map((emp) => (
              <Chip
                key={emp._id}
                label={`${emp.name} - ${emp.specificRole}`}
                color="primary"
              />
            ))}
          </Box>
        </Box>
      )}

      <Grid container spacing={3}>
        {loading ? (
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Grid>
        ) : error ? (
          <Grid item xs={12} sx={{ textAlign: "center", color: "red" }}>
            <Typography>{error}</Typography>
          </Grid>
        ) : employees.length > 0 ? (
          employees.map((emp) => (
            <Grid item xs={12} sm={6} md={3} key={emp._id}>
              <Card
                sx={{
                  textAlign: "center",
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                  maxWidth: 250,
                  margin: "auto",
                }}
              >
                <Avatar
                  sx={{ width: 64, height: 64, mx: "auto", bgcolor: "#1976D2" }}
                >
                  {emp.name.charAt(0).toUpperCase()}
                </Avatar>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {emp.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      backgroundColor: "#e0e0e0",
                      padding: "4px 8px",
                      borderRadius: 1,
                      mt: 1,
                    }}
                  >
                    {emp.specificRole}
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleAssign(emp)}
                    sx={{ mt: 2 }}
                    disabled={selectedEmployees.some((e) => e._id === emp._id)}
                  >
                    Assign
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography>No employees found.</Typography>
          </Grid>
        )}
      </Grid>

      {selectedEmployees.length > 0 && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button variant="contained" onClick={handleDone}>
            Done
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AssignEmployeesList;

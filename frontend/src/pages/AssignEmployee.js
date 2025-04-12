import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Chip } from '@mui/material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssignEmployees = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Set selectedEmployees when coming from employee selection
  useEffect(() => {
    if (location.state?.selectedEmployees) {
      setSelectedEmployees(location.state.selectedEmployees);
    }
  }, [location.state?.selectedEmployees]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/projects/${projectId}`);
        const data = await response.json();

        if (response.ok) {
          setProjectName(data.projectName);
          setDescription(data.description);
        } else {
          console.error("Error fetching project:", data.message);
        }
      } catch (err) {
        console.error("Failed to fetch project:", err);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleAssignEmployees = () => {
    navigate('/assignemployees', {
      state: {
        projectId,
        selectedEmployees
      },
    });
  };

  const handleSubmit = async () => {
    if (selectedEmployees.length === 0) {
      toast.error("Please assign at least one employee.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/projects/assign-employees/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeIds: selectedEmployees.map(e => e._id),
        }),
      });

      if (res.ok) {
        toast.success("Employees assigned successfully!");
        setSelectedEmployees([]);

        // ✅ Navigate to dashboard after a short delay to show toast
        setTimeout(() => {
          navigate('/tldashboard');
        }, 2000);
      } else {
        toast.error("Failed to assign employees");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3, borderRadius: 4, boxShadow: 5, backgroundColor: '#f8faff' }}>
      <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976D2' }}>
        Assign Employees to Project
      </Typography>

      <TextField
        fullWidth
        label="Project Name"
        value={projectName}
        disabled
        margin="normal"
      />

      <TextField
        fullWidth
        label="Description"
        value={description}
        disabled
        multiline
        rows={4}
        margin="normal"
      />

      <Box sx={{ mt: 2 }}>
        <Typography sx={{ mb: 1, fontWeight: 'bold', color: '#1565C0' }}>
          Assign Employees
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#4CAF50' }}
          onClick={handleAssignEmployees}
        >
          {selectedEmployees.length > 0 ? "Change Employees" : "Add Employees"}
        </Button>

        {selectedEmployees.length > 0 && (
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedEmployees.map((emp) => (
              <Chip key={emp._id} label={emp.name} color="primary" />
            ))}
          </Box>
        )}
      </Box>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ backgroundColor: '#1976D2' }}
        >
          Submit
        </Button>
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default AssignEmployees;


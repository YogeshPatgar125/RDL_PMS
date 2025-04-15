import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Box, Typography, Chip, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getProjectById, updateProjectStatus } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TLprojectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [originalEmployees, setOriginalEmployees] = useState([]);
  const [status, setStatus] = useState('Pending');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(projectId);
        setProjectName(data.projectName);
        setDescription(data.description);
        setTeamLeaderName(data.teamLeader?.name || 'N/A');

        let updatedList = data.assignedEmployees || [];

        if (location.state?.updatedEmployees) {
          updatedList = location.state.updatedEmployees;
        }

        setAssignedEmployees(updatedList);
        setOriginalEmployees(data.assignedEmployees || []);
        setStatus(data.status || 'Pending');
      } catch (error) {
        console.error("Failed to fetch project:", error);
        toast.error("Error fetching project data.");
      }
    };

    fetchProject();
  }, [projectId, location.state]);

  const handleUpdateTeam = () => {
    navigate("/assignemployees", {
      state: {
        projectId,
        returnTo: `/teamleadproject/${projectId}`,
        returnKey: "updatedEmployees",
      },
    });
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      const res = await updateProjectStatus(projectId, newStatus);
      if (res.success || res.message === "Project status updated successfully") {
        toast.success('Status updated successfully!');
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error updating status');
    }
  };

  const handleDone = async () => {
    const originalIds = originalEmployees.map(e => e._id);
    const newEmployees = assignedEmployees.filter(emp => !originalIds.includes(emp._id));

    if (newEmployees.length === 0) {
      toast.info("No new employees selected.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/projects/assign-employees/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeIds: newEmployees.map(e => e._id),
        }),
      });

      if (res.ok) {
        toast.success("New employees assigned successfully!");
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
        Project Details
      </Typography>

      <TextField fullWidth label="Project Name" value={projectName} disabled margin="normal" />
      <TextField fullWidth label="Description" value={description} disabled multiline rows={4} margin="normal" />
      <TextField fullWidth label="Team Leader" value={teamLeaderName} disabled margin="normal" />

      <Box sx={{ mt: 2 }}>
        <Typography sx={{ mb: 1, fontWeight: 'bold', color: '#1565C0' }}>
          Assigned Employees
        </Typography>

        {assignedEmployees.length > 0 ? (
          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {assignedEmployees.map((emp) => (
              <Chip
                key={emp._id}
                label={`${emp.name} — ${emp.specificRole || 'N/A'}`}
                color="primary"
              />
            ))}
          </Box>
        ) : (
          <Typography>No employees assigned yet.</Typography>
        )}
      </Box>

      {/* Update Team Members & Done Buttons */}
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={handleUpdateTeam}
          sx={{ borderColor: '#1976D2', color: '#1976D2' }}
        >
          Update Team Members
        </Button>

        <Button
          variant="contained"
          onClick={handleDone}
          sx={{ backgroundColor: '#388e3c' }}
        >
          Done
        </Button>
      </Box>

      {/* Status Dropdown */}
      <Box sx={{ mt: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={handleStatusChange}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Complete">Complete</MenuItem>
            <MenuItem value="Cancel">Cancel</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Submit Button */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          onClick={() => navigate('/tldashboard')}
          sx={{ backgroundColor: '#1976D2' }}
        >
          Submit
        </Button>
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default TLprojectDetails;

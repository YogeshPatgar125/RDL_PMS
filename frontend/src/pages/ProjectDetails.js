import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Chip } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getProjectById } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [assignedEmployees, setAssignedEmployees] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(projectId);
        setProjectName(data.projectName);
        setDescription(data.description);
        setTeamLeaderName(data.teamLeader?.name || 'N/A');
        setAssignedEmployees(data.assignedEmployees || []);
      } catch (error) {
        console.error("Failed to fetch project:", error);
        toast.error("Error fetching project data.");
      }
    };

    fetchProject();
  }, [projectId]);

  const handleDone = () => {
    navigate('/emdashboard'); // ✅ Adjust if your employee dashboard path is different
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

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          onClick={handleDone}
          sx={{ backgroundColor: '#1976D2' }}
        >
          Done
        </Button>
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default ProjectDetails;

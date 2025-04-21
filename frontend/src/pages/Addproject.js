import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Divider,
  Stack
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addproject = () => {
  const [projectName, setProjectName] = useState(() => localStorage.getItem('projectName') || '');
  const [description, setDescription] = useState(() => localStorage.getItem('description') || '');
  const [dueDate, setDueDate] = useState(() => localStorage.getItem('dueDate') || '');
  
  const navigate = useNavigate();
  const location = useLocation();
  const assignedLead = location.state?.teamLead || null;

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
    localStorage.setItem('projectName', e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    localStorage.setItem('description', e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
    localStorage.setItem('dueDate', e.target.value);
  };

  const handleSubmit = async () => {
    if (!projectName || !description || !assignedLead || !dueDate) {
      toast.error("Please fill all fields and assign a team leader!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    const [year, month, day] = dueDate.split('-');
    const formattedDate = `${day}-${month}-${year}`;

    const projectData = {
      projectName,
      description,
      dueDate: formattedDate,
      teamLeader: assignedLead,
    };

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        toast.success("Notified the team lead!", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });

        localStorage.removeItem('projectName');
        localStorage.removeItem('description');
        localStorage.removeItem('dueDate');
        setProjectName('');
        setDescription('');
        setDueDate('');

        setTimeout(() => {
          navigate('/addashboard');
        }, 2000);
      } else {
        toast.error("Failed to send project details!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error sending project data:", error);
      toast.error("An error occurred!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <Box sx={{ mt: 5, px: 2 }}>
      <Paper elevation={4} sx={{
        maxWidth: 700,
        mx: 'auto',
        p: 4,
        borderRadius: 3,
        backgroundColor: '#ffffff',
      }}>
        <Typography variant="h4" align="center" fontWeight={700} color="#1976D2" mb={3}>
          Assign New Project
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={3}>
          <TextField
            label="Project Name"
            fullWidth
            value={projectName}
            onChange={handleProjectNameChange}
            variant="outlined"
          />

          <TextField
            label="Project Description"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={handleDescriptionChange}
            variant="outlined"
          />

          <TextField
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={handleDueDateChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography fontWeight={600} color="#1565C0">
              {assignedLead ? 'Team Leader Assigned' : 'Assign Team Leader'}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/assignlead')}
              size="small"
            >
              {assignedLead ? 'Change' : 'Assign'}
            </Button>
          </Box>

          {assignedLead && (
            <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f1faff', borderLeft: '5px solid #1976D2' }}>
              <Typography variant="body1" fontWeight="bold">
                {assignedLead.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Role: {assignedLead.role}
              </Typography>
            </Paper>
          )}

          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: '#1976D2',
              color: '#fff',
              '&:hover': { backgroundColor: '#115293' },
              py: 1.5,
              fontWeight: 600,
              mt: 2,
            }}
            fullWidth
          >
            Submit Project
          </Button>
        </Stack>
      </Paper>
      <ToastContainer />
    </Box>
  );
};

export default Addproject;

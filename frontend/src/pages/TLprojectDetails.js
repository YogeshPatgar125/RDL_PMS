import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Chip, MenuItem, Select, FormControl,
  InputLabel, Divider, Paper, Grid, Avatar
} from '@mui/material';
import {
  AssignmentOutlined, PeopleAltOutlined, PersonOutline, DescriptionOutlined,
  FlagOutlined, GroupAdd, Done, Send
} from '@mui/icons-material';
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
    } catch {
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
        body: JSON.stringify({ employeeIds: newEmployees.map(e => e._id) }),
      });

      if (res.ok) {
        toast.success("New employees assigned successfully!");
      } else {
        toast.error("Failed to assign employees");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', my: 6 }}>
      <Paper elevation={6} sx={{ borderRadius: 4, p: 4, background: '#f4f7fb' }}>
        <Box
          sx={{
            mb: 4,
            p: 2,
            borderRadius: 2,
            textAlign: 'center',
            background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
            color: 'white',
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            <AssignmentOutlined sx={{ verticalAlign: 'middle', mr: 1 }} />
            Project Overview
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              <AssignmentOutlined fontSize="small" sx={{ mr: 1 }} /> Project Name
            </Typography>
            <Typography variant="h6">{projectName}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              <PersonOutline fontSize="small" sx={{ mr: 1 }} /> Team Leader
            </Typography>
            <Typography variant="body1">{teamLeaderName}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              <DescriptionOutlined fontSize="small" sx={{ mr: 1 }} /> Description
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{description}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
          <PeopleAltOutlined sx={{ mr: 1, color: '#1976d2' }} /> Assigned Employees
        </Typography>

        {assignedEmployees.length > 0 ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {assignedEmployees.map((emp) => (
              <Chip
                key={emp._id}
                avatar={<Avatar>{emp.name?.[0]}</Avatar>}
                label={`${emp.name} • ${emp.specificRole || 'N/A'}`}
                variant="outlined"
                sx={{ backgroundColor: '#e3f2fd' }}
              />
            ))}
          </Box>
        ) : (
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            No employees assigned yet.
          </Typography>
        )}

        <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<GroupAdd />}
            onClick={handleUpdateTeam}
          >
            Update Team
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<Done />}
            onClick={handleDone}
          >
            Done
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <FormControl fullWidth>
            <InputLabel>
              <FlagOutlined sx={{ verticalAlign: 'middle', mr: 1 }} /> Status
            </InputLabel>
            <Select value={status} label="Status" onChange={handleStatusChange}>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Complete">Complete</MenuItem>
              <MenuItem value="Cancel">Cancel</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<Send />}
            size="large"
            sx={{ px: 5 }}
            onClick={() => navigate('/tldashboard')}
          >
            Submit
          </Button>
        </Box>
      </Paper>

      <ToastContainer />
    </Box>
  );
};

export default TLprojectDetails;

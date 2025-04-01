// Addproject.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addproject = () => {
  const [projectName, setProjectName] = useState(() => localStorage.getItem('projectName') || '');
  const [description, setDescription] = useState(() => localStorage.getItem('description') || '');
  
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve assigned team leader from state
  const assignedLead = location.state?.teamLead || null;

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
    localStorage.setItem('projectName', e.target.value);
  };
  
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    localStorage.setItem('description', e.target.value);
  };
  

  // Handle Submit
  // const handleSubmit = () => {
  //   if (!projectName || !description || !assignedLead) {
  //     toast.error("Please fill all fields and assign a team leader !", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //     return;
  //   }
  //   console.log({
  //     projectName,
  //     description,
  //     teamLeader: assignedLead,
  //   });

  //   // Show success toast
  //   toast.success("Notified the team lead!", {
  //     position: "top-right",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  //   });
  // };

  const handleSubmit = () => {
    if (!projectName || !description || !assignedLead) {
      toast.error("Please fill all fields and assign a team leader!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
  
    // Log project details (replace this with an API call if needed)
    console.log({
      projectName,
      description,
      teamLeader: assignedLead,
    });
  
    // Show success toast
    toast.success("Notified the team lead!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  
    // Clear localStorage after successful submission
    localStorage.removeItem('projectName');
    localStorage.removeItem('description');
  
    // Reset state (including team lead)
    setProjectName('');
    setDescription('');
    navigate('/addproject', { state: { teamLead: null } }); // Reset the team leader
  };
  
  

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 5,
        p: 3,
        borderRadius: 4,
        boxShadow: 5,
        backgroundColor: '#f8faff', // Soft bluish background
        border: '2px solid #e0eaff', 
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#1976D2',
        }}
      >
        New Project
      </Typography>
{/*         
      <TextField
        fullWidth
        label="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        margin="normal"
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 1,
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': { borderColor: '#1976D2' },
            '&.Mui-focused fieldset': { borderColor: '#1976D2' },
          },
        }}
      />

      <TextField
        fullWidth
        label="Description of Project"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 1,
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': { borderColor: '#1976D2' },
            '&.Mui-focused fieldset': { borderColor: '#1976D2' },
          },
        }}
      /> */}

<TextField
  fullWidth
  label="Project Name"
  value={projectName}
  onChange={(e) => {
    setProjectName(e.target.value);
    localStorage.setItem('projectName', e.target.value); // Store input value in localStorage
  }}
  margin="normal"
  sx={{
    backgroundColor: 'white',
    borderRadius: 2,
    boxShadow: 1,
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': { borderColor: '#1976D2' },
      '&.Mui-focused fieldset': { borderColor: '#1976D2' },
    },
  }}
/>

<TextField
  fullWidth
  label="Description of Project"
  multiline
  rows={4}
  value={description}
  onChange={(e) => {
    setDescription(e.target.value);
    localStorage.setItem('description', e.target.value); // Store input value in localStorage
  }}
  margin="normal"
  sx={{
    backgroundColor: 'white',
    borderRadius: 2,
    boxShadow: 1,
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': { borderColor: '#1976D2' },
      '&.Mui-focused fieldset': { borderColor: '#1976D2' },
    },
  }}
/>


      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Typography sx={{ mr: 2, color: '#1565C0', fontWeight: 'bold' }}>
          Add the Team Leader
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: assignedLead ? '#FF9800' : '#4CAF50',
            '&:hover': {
              backgroundColor: assignedLead ? '#FB8C00' : '#388E3C',
            },
          }}
          onClick={() => navigate('/assignlead')}
        >
          {assignedLead ? "Change" : "Add"}
        </Button>
      </Box>

      {assignedLead && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: '#E3F2FD',
            borderRadius: 2,
            border: '1px solid #BBDEFB',
            boxShadow: 2,
          }}
        >
          <Typography variant="body1" fontWeight="bold" color="#0D47A1">
            Team Leader: {assignedLead.name}
          </Typography>
          <Typography variant="body2" color="#1565C0">
            Role: {assignedLead.role}
          </Typography>
        </Box>
      )}

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1976D2',
            color: 'white',
            paddingX: 5,
            '&:hover': {
              backgroundColor: '#1565C0',
            },
          }}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default Addproject;

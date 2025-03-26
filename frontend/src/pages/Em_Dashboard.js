import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Divider } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import Em_Navbar from '../components/Em_Navbar';

const Em_Dashboard = () => {
  const projectData = [
    { name: 'Website Redesign', assignedTo: 'Alice', dueDate: '25 Mar 2025', status: 'Pending' },
    { name: 'Mobile App Development', assignedTo: 'Bob', dueDate: '30 Mar 2025', status: 'Cancelled' },
    { name: 'Marketing Campaign', assignedTo: 'Charlie', dueDate: '18 Mar 2025', status: 'Completed' },
    { name: 'CRM Integration', assignedTo: 'David', dueDate: '28 Mar 2025', status: 'Pending' },
    { name: 'Security Audit', assignedTo: 'Eve', dueDate: '5 Apr 2025', status: 'Cancelled' },
    { name: 'Data Migration', assignedTo: 'Frank', dueDate: '1 Apr 2025', status: 'Pending' },
    { name: 'AI Chatbot Integration', assignedTo: 'Grace', dueDate: '15 Mar 2025', status: 'Completed' },
  ];

  const statuses = projectData.reduce((acc, project) => {
    if (project.status === 'Completed') acc.completed += 1;
    if (project.status === 'Pending') acc.pending += 1;
    if (project.status === 'Cancelled') acc.cancelled += 1;
    return acc;
  }, { completed: 0, pending: 0, cancelled: 0 });

  const chartData = {
    labels: ['Completed', 'Pending', 'Cancelled'],
    datasets: [{
      data: [statuses.completed, statuses.pending, statuses.cancelled],
      backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
      borderWidth: 2,
    }],
  };

  return (
    <>
      <Em_Navbar />
      <Box 
        p={3} 
        sx={{ 
          backgroundColor: '#f5f9ff', 
          minHeight: '100vh', 
          overflowY: 'auto', // Single global scrollbar
          overflowX: 'hidden' 
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="#1e3a8a" mb={3}>
          Employee Dashboard
        </Typography>

        <Grid container spacing={3}>
          {['Total Projects', 'Employees'].map((title, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                sx={{
                  background: `linear-gradient(145deg, ${
                    index === 0 ? '#b3d4fc' : '#e2f1ff'
                  }, white)`,
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  borderRadius: '15px',
                  transition: '0.3s',
                  '&:hover': { boxShadow: 8, transform: 'scale(1.05)' },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="#1e3a8a">
                    <b>{title}</b>
                  </Typography>
                  <Typography variant="h3" color={index === 0 ? '#1e3a8a' : '#0d47a1'} fontWeight="bold">
                    <b>{index === 0 ? 8 : 35}</b>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" fontWeight="bold" color="#1e3a8a" sx={{ mb: 2 }}>
          Project List
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ backgroundColor: '#ffffff', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Grid container spacing={1} sx={{ fontWeight: 'bold', mb: 1 }}>
                  <Grid item xs={1}><Typography>#</Typography></Grid>
                  <Grid item xs={3}><Typography>Project Name</Typography></Grid>
                  <Grid item xs={3}><Typography>Assigned To</Typography></Grid>
                  <Grid item xs={2}><Typography>Due Date</Typography></Grid>
                  <Grid item xs={3}><Typography>Status</Typography></Grid>
                </Grid>
                <Divider />
                {projectData.map((project, index) => (
                  <Grid container spacing={1} key={index} sx={{ py: 1 }}>
                    <Grid item xs={1}><Typography>{index + 1}</Typography></Grid>
                    <Grid item xs={3}><Typography>{project.name}</Typography></Grid>
                    <Grid item xs={3}><Typography>{project.assignedTo}</Typography></Grid>
                    <Grid item xs={2}><Typography>{project.dueDate}</Typography></Grid>
                    <Grid item xs={3}>
                      <Typography fontWeight="bold" color={
                        project.status === 'Completed' ? '#4caf50' :
                        project.status === 'Cancelled' ? '#f44336' : '#ff9800'
                      }>
                        {project.status}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '15px', 
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
              }}
            >
              <CardContent sx={{ width: '100%', height: '100%', p: 2 }}>
                <Typography variant="h6" fontWeight="bold" align="center" color="#1e3a8a" sx={{ mb: 2 }}>
                  Project Status
                </Typography>
                <Doughnut 
                  data={chartData} 
                  options={{
                    maintainAspectRatio: false,
                    responsive: true,
                  }}
                  style={{ maxHeight: '250px' }} 
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Em_Dashboard;

import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Divider } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import Navbar from '../components/Navbar';


const ProjectDashboard = () => {
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
      backgroundColor: ['#66bb6a', '#ff7043', '#ffeb3b'],
      borderWidth: 1,
    }],
  };

  return (
    <>
      <Navbar />
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Projects</Typography>
                <Typography variant="h4" color="primary">8</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Team Leaders</Typography>
                <Typography variant="h4" color="green">10</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Employees</Typography>
                <Typography variant="h4" color="error">35</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Project Status</Typography>
                <Doughnut data={chartData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6">Project List</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={1}><Typography fontWeight="bold">Sl No</Typography></Grid>
                  <Grid item xs={3}><Typography fontWeight="bold">Project Name</Typography></Grid>
                  <Grid item xs={2}><Typography fontWeight="bold">Assigned To</Typography></Grid>
                  <Grid item xs={2}><Typography fontWeight="bold">Due Date</Typography></Grid>
                  <Grid item xs={2}><Typography fontWeight="bold">Status</Typography></Grid>
                </Grid>
                {projectData.map((project, index) => (
                  <Grid container spacing={1} key={index}>
                    <Grid item xs={1}><Typography>{index + 1}</Typography></Grid>
                    <Grid item xs={3}><Typography>{project.name}</Typography></Grid>
                    <Grid item xs={2}><Typography>{project.assignedTo}</Typography></Grid>
                    <Grid item xs={2}><Typography>{project.dueDate}</Typography></Grid>
                    <Grid item xs={2}>
                      <Typography color={
                        project.status === 'Completed' ? 'green' :
                        project.status === 'Cancelled' ? 'red' : 'orange'
                      }>{project.status}</Typography>
                    </Grid>
                  </Grid>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProjectDashboard;

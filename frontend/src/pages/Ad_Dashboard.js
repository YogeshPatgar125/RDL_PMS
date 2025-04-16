import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ProjectDashboard = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const projectsPerPage = 8;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects');
        const data = await response.json();
        setProjectData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project data:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const normalizeStatus = (status) => (status || '').toLowerCase().trim();

  const statuses = projectData.reduce(
    (acc, project) => {
      const status = normalizeStatus(project.status);
      if (['completed', 'complete'].includes(status)) acc.completed += 1;
      else if (['cancelled', 'canceled', 'cancel'].includes(status)) acc.cancelled += 1;
      else acc.pending += 1;
      return acc;
    },
    { completed: 0, pending: 0, cancelled: 0 }
  );

  const getStatusColor = (status) => {
    const normalized = normalizeStatus(status);
    if (['completed', 'complete'].includes(normalized)) return '#4caf50'; // green
    if (['cancelled', 'canceled', 'cancel'].includes(normalized)) return '#f44336'; // red
    return '#ff9800'; // orange (pending/other)
  };

  const chartData = {
    labels: ['Completed', 'Pending', 'Cancelled'],
    datasets: [
      {
        data: [statuses.completed, statuses.pending, statuses.cancelled],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
        borderWidth: 2,
      },
    ],
  };

  // Pagination logic
  const startIndex = (page - 1) * projectsPerPage;
  const paginatedProjects = projectData.slice(startIndex, startIndex + projectsPerPage);
  const totalPages = Math.ceil(projectData.length / projectsPerPage);

  return (
    <Box
      p={3}
      sx={{
        backgroundColor: '#f5f9ff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4" fontWeight="bold" color="#1e3a8a" mb={3}>
        Project Dashboard
      </Typography>

      {/* Summary cards */}
      <Grid container spacing={3}>
        {['Total Projects', 'Team Leaders', 'Employees'].map((title, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                background: `linear-gradient(145deg, ${
                  index === 0 ? '#b3d4fc' : index === 1 ? '#cce5ff' : '#e2f1ff'
                }, white)`,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                borderRadius: '15px',
                transition: '0.3s',
                '&:hover': { boxShadow: 8, transform: 'scale(1.05)' },
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" color="#1e3a8a">
                  {title}
                </Typography>
                <Typography
                  variant="h3"
                  color={index === 0 ? '#1e3a8a' : index === 1 ? '#1565c0' : '#0d47a1'}
                  fontWeight="bold"
                >
                  {index === 0
                    ? projectData.length
                    : index === 1
                    ? 10
                    : 35}
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

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
          {/* Left: Project List */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                {/* Table Headers */}
                <Grid container spacing={1} sx={{ fontWeight: 'bold', mb: 1 }}>
                  <Grid item xs={1}>
                    <Typography>Id</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Project Name</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Assigned To</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>Due Date</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Status</Typography>
                  </Grid>
                </Grid>
                <Divider />
                {/* Paginated Project Rows */}
                {paginatedProjects.map((project, index) => (
                  <Grid container spacing={1} key={index} sx={{ py: 1 }}>
                    <Grid item xs={1}>
                      <Typography>{startIndex + index + 1}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>{project.projectName}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>{project.teamLeader?.name || 'N/A'}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>{project.dueDate || 'N/A'}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography fontWeight="bold" color={getStatusColor(project.status)}>
                        {project.status || 'Pending'}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </CardContent>

              {/* Pagination Controls */}
              <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                <IconButton
                  size="small"
                  sx={{
                    border: '1px solid #1e3a8a',
                    borderRadius: '50%',
                    mx: 1,
                    color: '#1e3a8a',
                  }}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <Typography fontWeight="bold" color="#1e3a8a">
                  Page {page} of {totalPages}
                </Typography>
                <IconButton
                  size="small"
                  sx={{
                    border: '1px solid #1e3a8a',
                    borderRadius: '50%',
                    mx: 1,
                    color: '#1e3a8a',
                  }}
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>

          {/* Right: Project Status Chart */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  align="center"
                  color="#1e3a8a"
                  sx={{ mb: 2 }}
                >
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
      )}
    </Box>
  );
};

export default ProjectDashboard;

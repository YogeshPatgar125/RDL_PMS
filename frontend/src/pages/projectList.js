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
  Button,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';

const AnimatedCounter = ({ target, delay = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const end = parseInt(target);
      const duration = 1000;
      const incrementTime = 30;
      const steps = duration / incrementTime;
      const stepValue = end / steps;

      const counter = setInterval(() => {
        start += stepValue;
        if (start >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.ceil(start));
        }
      }, incrementTime);
    }, delay);

    return () => clearTimeout(timeout);
  }, [target, delay]);

  return <>{count}</>;
};

const ProjectList = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const projectsPerPage = 8;

  const navigate = useNavigate();

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

  const getStatusColor = (status) => {
    const normalized = normalizeStatus(status);
    if (['completed', 'complete'].includes(normalized)) return '#4caf50';
    if (['cancelled', 'canceled', 'cancel'].includes(normalized)) return '#f44336';
    return '#ff9800';
  };

  const startIndex = (page - 1) * projectsPerPage;
  const paginatedProjects = projectData.slice(startIndex, startIndex + projectsPerPage);
  const totalPages = Math.ceil(projectData.length / projectsPerPage);

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold" color="#1e3a8a">
          Project List
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#388e3c' } }}
          onClick={() => navigate('/addproject')}
        >
          Add Project
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              }}
            >
              <CardContent>
                <Grid
                  container
                  spacing={1}
                  sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    backgroundColor: '#005792',
                    color: '#ffffff',
                    padding: '10px',
                    borderRadius: '8px',
                  }}
                >
                  <Grid item xs={1}><Typography>Sl No.</Typography></Grid>
                  <Grid item xs={3}><Typography>Project Name</Typography></Grid>
                  <Grid item xs={3}><Typography>Assigned To</Typography></Grid>
                  <Grid item xs={2}><Typography>Due Date</Typography></Grid>
                  <Grid item xs={3}><Box sx={{ ml: 4 }}><Typography>Status</Typography></Box></Grid>
                </Grid>
                <Divider />
                {paginatedProjects.map((project, index) => (
                  <Grid container spacing={1} key={index} sx={{ py: 1 }}>
                    <Grid item xs={1}><Typography>{startIndex + index + 1}</Typography></Grid>
                    <Grid item xs={3}><Typography>{project.projectName}</Typography></Grid>
                    <Grid item xs={3}><Typography>{project.teamLeader?.name || 'N/A'}</Typography></Grid>
                    <Grid item xs={2}><Typography>{project.dueDate || 'N/A'}</Typography></Grid>
                    <Grid item xs={3}>
                      <Box
                        sx={{
                          backgroundColor: getStatusColor(project.status),
                          color: '#fff',
                          px: 2,
                          py: 0.5,
                          borderRadius: '8px',
                          display: 'inline-block',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          minWidth: '90px',
                        }}
                      >
                        {project.status || 'Pending'}
                      </Box>
                    </Grid>
                  </Grid>
                ))}
              </CardContent>

              <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                <IconButton
                  size="small"
                  sx={{ border: '1px solid #1e3a8a', borderRadius: '50%', mx: 1, color: '#1e3a8a' }}
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
                  sx={{ border: '1px solid #1e3a8a', borderRadius: '50%', mx: 1, color: '#1e3a8a' }}
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ProjectList;

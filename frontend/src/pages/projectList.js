import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  CircularProgress,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const [projectData, setProjectData] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects');
        const data = await response.json();
        setProjectData(data);
        setFilteredProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project data:', error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = [...projectData];
    const lowerSearch = searchTerm.toLowerCase().trim();
    if (searchTerm) {
      filtered = filtered.filter((project) =>
        project.projectName?.toLowerCase().includes(lowerSearch)
      );
    }

    if (sortBy === 'project') {
      filtered.sort((a, b) => a.projectName?.localeCompare(b.projectName));
    } else if (sortBy === 'dueDate') {
      filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortBy === 'status') {
      filtered.sort((a, b) => (a.status || '').localeCompare(b.status || ''));
    }

    setFilteredProjects(filtered);
  }, [searchTerm, sortBy, projectData]);

  const normalizeStatus = (status) => (status || '').toLowerCase().trim();

  const getStatusColor = (status) => {
    const normalized = normalizeStatus(status);
    if (['completed', 'complete'].includes(normalized)) return '#4caf50';
    if (['cancelled', 'canceled', 'cancel'].includes(normalized)) return '#f44336';
    return '#ff9800';
  };

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

      <Box display="flex" gap={2} alignItems="center" mb={2}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search project"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '200px' }}
        />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="project">Project Name</MenuItem>
            <MenuItem value="dueDate">Due Date</MenuItem>
            <MenuItem value="status">Status</MenuItem>
          </Select>
        </FormControl>
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
                  <Grid item xs={2.4}><Typography>Sl No.</Typography></Grid>
                  <Grid item xs={2.4}><Typography>Project Name</Typography></Grid>
                  <Grid item xs={2.4}><Typography>Assigned To</Typography></Grid>
                  <Grid item xs={2.4}><Typography>Due Date</Typography></Grid>
                  <Grid item xs={2.4}><Typography>Status</Typography></Grid>
                </Grid>
                <Divider />
                {filteredProjects.map((project, index) => (
                  <Grid container spacing={1} key={index} sx={{ py: 1 }}>
                    <Grid item xs={2.4}><Typography>{index + 1}</Typography></Grid>
                    <Grid item xs={2.4}><Typography>{project.projectName}</Typography></Grid>
                    <Grid item xs={2.4}><Typography>{project.teamLeader?.name || 'N/A'}</Typography></Grid>
                    <Grid item xs={2.4}><Typography>{project.dueDate || 'N/A'}</Typography></Grid>
                    <Grid item xs={2.4}>
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
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ProjectList;

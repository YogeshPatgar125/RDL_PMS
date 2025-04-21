import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Box, Paper, Divider } from "@mui/material";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/${id}`);
        setProject(res.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProjectDetails();
  }, [id]);

  if (!project) return <Typography>Loading project details...</Typography>;

  return (
    <Box p={3}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {project.projectName}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Team Lead:</strong> {project.teamLeader?.name || "N/A"}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Status:</strong> {project.status}
        </Typography>
        <Divider sx={{ my: 2 }} />

        {/* Team Lead Updates */}
        <Typography variant="h6" gutterBottom>
          🧑‍💼 Team Lead Updates
        </Typography>
        {project.teamLeadUpdates?.length > 0 ? (
          project.teamLeadUpdates.map((update, index) => (
            <Typography key={index} variant="body1" sx={{ mb: 1 }}>
              • {update}
            </Typography>
          ))
        ) : (
          <Typography variant="body2">No updates from team lead.</Typography>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Employee Updates */}
        <Typography variant="h6" gutterBottom>
          👥 Employee Updates
        </Typography>
        {project.employeeUpdates?.length > 0 ? (
          project.employeeUpdates.map((update, index) => (
            <Typography key={index} variant="body1" sx={{ mb: 1 }}>
              • {update}
            </Typography>
          ))
        ) : (
          <Typography variant="body2">No employee updates yet.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ProjectDetailsPage;

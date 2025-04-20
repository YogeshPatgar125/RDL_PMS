import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";

const TeamLeadTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [teamLeadFilter, setTeamLeadFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Latest");
  const [expandedTaskIndex, setExpandedTaskIndex] = useState(null);


  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks");
      const data = await response.json();
      if (response.ok) {
        setTasks(data);
      } else {
        console.error("Failed to fetch tasks:", data.error);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const getUniqueTeamLeads = () => {
    const leads = tasks.map((task) => task.teamLeader);
    return ["All", ...new Set(leads)];
  };

  const filteredTasks = tasks
    .filter((task) =>
      `${task.taskName} ${task.employee}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .filter((task) =>
      teamLeadFilter === "All" ? true : task.teamLeader === teamLeadFilter
    )
    .sort((a, b) => {
      if (sortOption === "A-Z") {
        return a.taskName.localeCompare(b.taskName);
      } else {
        return b._id.localeCompare(a._id); // Assuming _id is a Mongo-generated string which roughly sorts newest first
      }
    });

  return (
    <Box sx={{ padding: 4, minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Paper
        elevation={4}
        sx={{ maxWidth: 1100, mx: "auto", p: 4, borderRadius: 3 }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: "bold",
            color: "#1976d2",
            textAlign: "center",
          }}
        >
          📋 Team Daily Task Board
        </Typography>

        {/* Filters */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            mb: 4,
          }}
        >
          <TextField
            label="Search Task/Employee"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            label="Filter by Team Lead"
            size="small"
            value={teamLeadFilter}
            onChange={(e) => setTeamLeadFilter(e.target.value)}
          >
            {getUniqueTeamLeads().map((lead) => (
              <MenuItem key={lead} value={lead}>
                {lead}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Sort by"
            size="small"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SortIcon />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="Latest">Latest First</MenuItem>
            <MenuItem value="A-Z">Task A-Z</MenuItem>
          </TextField>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : filteredTasks.length === 0 ? (
          <Typography variant="h6" align="center">
            No tasks found.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredTasks.map((task, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card
                elevation={2}
                onClick={() =>
                  setExpandedTaskIndex(expandedTaskIndex === index ? null : index)
                }
                sx={{
                  borderLeft: "6px solid #1976d2",
                  borderRadius: 2,
                  backgroundColor: "#fefefe",
                  transition: "0.3s",
                  cursor: "pointer",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
                      <AssignmentIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {task.taskName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        By {task.employee} | Lead: {task.teamLeader}
                      </Typography>
                    </Box>
                  </Box>

                  {expandedTaskIndex === index && (
                    <>
                      <Divider sx={{ mb: 1 }} />
                      <Typography variant="body2" color="text.primary">
                        {task.taskDetails}
                      </Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}

          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default TeamLeadTasks;

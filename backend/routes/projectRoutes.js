const express = require('express');
const {
  getTeamLeader,
  createProject,
  getProjects,
  getAllEmployee,
  getProjectById,
} = require('../controllers/projectController');
const { assignEmployeesToProject } = require('../controllers/teamleaderController');

const router = express.Router();

// Routes
router.get('/teamLeader', getTeamLeader);
router.get('/employee', getAllEmployee);
router.post('/', createProject);
router.get('/', getProjects);
router.put('/assign-employees/:projectId', assignEmployeesToProject);
router.get('/:projectId', getProjectById); // Keep dynamic routes last

module.exports = router;

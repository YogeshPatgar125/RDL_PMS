// const express = require('express');
// const {
//   getTeamLeader,
//   createProject,
//   getProjects,
//   getAllEmployee,
//   getProjectById,
//   getProjectsByEmployee,
// } = require('../controllers/projectController');
// const { assignEmployeesToProject } = require('../controllers/teamleaderController');

// const router = express.Router();

// // Routes
// router.get('/teamLeader', getTeamLeader);
// router.get('/employee', getAllEmployee);
// router.post('/', createProject);
// router.get('/', getProjects);
// router.put('/assign-employees/:projectId', assignEmployeesToProject);
// router.get('/:projectId', getProjectById); // Keep dynamic routes last
// router.get('/employee/projects/:employeeId', getProjectsByEmployee);

// module.exports = router;


const express = require('express');
const {
  getTeamLeader,
  createProject,
  getProjects,
  getAllEmployee,
  getProjectById,
  getProjectsByEmployee,
} = require('../controllers/projectController');
const { assignEmployeesToProject } = require('../controllers/teamleaderController');

const router = express.Router();

router.get('/teamLeader', getTeamLeader);
router.get('/employee', getAllEmployee);
router.post('/', createProject);
router.get('/', getProjects);
router.put('/assign-employees/:projectId', assignEmployeesToProject);
router.get('/:projectId', getProjectById);
router.get('/employee/projects/:employeeId', getProjectsByEmployee);

module.exports = router;

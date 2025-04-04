const express = require('express');
const { getTeamLeader } = require('../controllers/projectController'); // Ensure correct destructuring here
const router = express.Router();

// Correct route with the controller function passed as a callback
router.get('/teamLeader', getTeamLeader);

module.exports = router;

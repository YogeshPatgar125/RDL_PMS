// routes/stats.js or in your main server file
const express = require('express');
const router = express.Router();
const Project = require('../models/project'); // adjust if your model path is different
const User = require('../models/userModel');

// GET /api/stats
router.get('/stats', async (req, res) => {
  try {
    const [projects, users] = await Promise.all([
      Project.find({}),
      User.find({})
    ]);

    const teamLeaders = users.filter(user => user.role === 'teamleader').length;
    const employees = users.filter(user => user.role === 'employee').length;

    res.json({
      totalProjects: projects.length,
      teamLeaders,
      employees,
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;

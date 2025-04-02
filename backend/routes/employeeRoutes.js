// routes/employeeRoutes.js
const express = require('express');
const { getEmployees } = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
router.get('/', authMiddleware, getEmployees);
module.exports = router;
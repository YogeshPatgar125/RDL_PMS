const express = require('express');
const { createReport } = require("../controllers/reportController");
const { authenticateToken } = require("../middlewares/authMiddleware") ;

const router = express.Router();

router.post("/reports/:projectId", authenticateToken, createReport); // Submit report


module.exports= router;

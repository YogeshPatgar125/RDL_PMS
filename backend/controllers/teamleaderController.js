// controllers/assignmentController.js
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Project = require('../models/project');
const Notification = require('../models/notification');

exports.assignEmployeesToProject = async (req, res) => {
  const { projectId } = req.params;
  const { employeeIds } = req.body;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: "Invalid Project ID" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Merge employees (avoid duplicates)
    project.assignedEmployees = [...new Set([...project.assignedEmployees, ...employeeIds])];

    await project.save();

    // Send notifications
    for (const empId of employeeIds) {
      await Notification.create({
        userId: empId,
        message: `You have been assigned to project: ${project.projectName}`,
        isRead: false,
        projectId: project._id, // optional but useful
      });
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    console.error("Error assigning employees:", error);
    res.status(500).json({ error: "Assignment failed" });
  }
};

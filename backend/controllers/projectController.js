const mongoose = require("mongoose"); // ✅ Needed for ObjectId validation
const User = require("../models/userModel");
const Project = require("../models/project");
const Notification = require("../models/notification");

// ✅ Get all employees
exports.getAllEmployee = async (req, res) => {
  try {
    const employee = await User.find({ role: 'employee' });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error in finding the employee', error });
  }
};

// ✅ Get all team leaders
exports.getTeamLeader = async (req, res) => {
  try {
    const teamLead = await User.find({ role: 'teamleader' });
    res.status(200).json(teamLead);
  } catch (error) {
    res.status(500).json({ message: 'Error in finding the team leader', error });
  }
};

// ✅ Create a new project and notify the assigned team leader
exports.createProject = async (req, res) => {
  try {
    const { projectName, description, teamLeader } = req.body;

    if (!projectName || !description || !teamLeader) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProject = new Project({
      projectName,
      description,
      teamLeader,
    });

    const savedProject = await newProject.save();

    // Notify the team leader
    await Notification.create({
      userId: teamLeader._id || teamLeader,
      message: `You have been assigned a new project: ${projectName}`,
      projectId: savedProject._id,
    });

    res.status(201).json({
      message: "Project saved and team leader notified",
      project: savedProject,
    });
  } catch (error) {
    console.error("❌ Error creating project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId)
      .populate("employees", "name specificRole") // Include name and specificRole
      .populate("assignedEmployees", "name specificRole");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("❌ Error fetching project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const User = require("../models/userModel");
const Project = require("../models/project");
exports.getTeamLeader = async (req, res) => {
  try {
    const teamLead = await User.find({ role: 'teamleader' }); // Ensure 'await' is used correctly
    res.status(200).json(teamLead);
  } catch (error) {
    res.status(500).json({ message: 'Error in finding the team leader', error });
  }
};




exports.createProject = async (req, res) => {
  try {
    const { projectName, description, teamLeader } = req.body;

    if (!projectName || !description || !teamLeader) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProject = new Project({
      projectName,
      description,
      teamLeader,
    });

    await newProject.save();
    res.status(201).json({ message: 'Project saved successfully', project: newProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get all projects
// @route GET /api/projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
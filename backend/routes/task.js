const express = require("express");
const router = express.Router();
const Task = require("../models/Tasks");

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST a new task
router.post("/", async (req, res) => {
  const { teamLeader, employee, taskName, taskDetails } = req.body;
  if (!teamLeader || !employee || !taskName || !taskDetails) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newTask = new Task({ teamLeader, employee, taskName, taskDetails });
    await newTask.save();
    res.status(201).json({ message: "Task created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

module.exports = router;

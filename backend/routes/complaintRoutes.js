const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// POST route to add new complaint
router.post("/", async (req, res) => {
    try {
      const newComplaint = new Complaint(req.body);
      await newComplaint.save();
      res.status(201).json(newComplaint);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
// DELETE complaint
router.delete("/:id", async (req, res) => {
    try {
      await Complaint.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // PUT: Toggle status
  router.put("/status/:id", async (req, res) => {
    try {
      const complaint = await Complaint.findById(req.params.id);
      if (!complaint) return res.status(404).json({ error: "Complaint not found" });
  
      complaint.status = complaint.status === "Resolved" ? "Pending" : "Resolved";
      await complaint.save();
      res.status(200).json(complaint);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // PUT: Update complaint details
router.put("/:id", async (req, res) => {
    try {
      const { name, dueDate, description } = req.body;
      const updated = await Complaint.findByIdAndUpdate(
        req.params.id,
        { name, dueDate, description },
        { new: true }
      );
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
module.exports = router;

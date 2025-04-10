const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  name: String,
  dueDate: String,
  description: String,
  status: {
    type: String,
    enum: ["Pending", "Resolved"],
    default: "Pending"
  }
});

module.exports = mongoose.model("Complaint", complaintSchema);

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  teamLeader: String,
  employee: String,
  taskName: String,
  taskDetails: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tasks", taskSchema);

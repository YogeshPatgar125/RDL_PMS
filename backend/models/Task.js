// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  teamLeader: { type: String, required: true },
  employee: { type: String, required: true },
  taskName: { type: String, required: true },
  taskDetails: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);

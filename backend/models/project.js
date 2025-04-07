// models/project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  teamLeader: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    role: String,
  },
  employees: [
    {  type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ],
  assignedEmployees: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', projectSchema);

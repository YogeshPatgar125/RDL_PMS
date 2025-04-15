
// with date
// const mongoose = require('mongoose');

// const projectSchema = new mongoose.Schema({
//   projectName: { type: String, required: true },
//   description: { type: String, required: true },
//   dueDate: { type: String, required: true }, // Date stored as "DD-MM-YYYY"
//   teamLeader: {
//     _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     name: String,
//     role: String,
//   },
//   employees: [
//     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   ],
//   assignedEmployees: [
//     { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
//   ],
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Project', projectSchema);



const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: String, required: true }, // Date stored as "DD-MM-YYYY"
  teamLeader: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    role: String,
  },
  employees: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ],
  assignedEmployees: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  status: { type: String, enum: ['Pending', 'Complete', 'Cancel'], default: 'Pending' },  // New status field
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', projectSchema);


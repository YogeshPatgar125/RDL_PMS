const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  teamLeader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  reportDetails: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Report", reportSchema);


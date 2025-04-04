const User = require("../models/userModel");

const getTeamLeader = async (req, res) => {
  try {
    const teamLead = await User.find({ role: 'teamleader' }); // Ensure 'await' is used correctly
    res.status(200).json(teamLead);
  } catch (error) {
    res.status(500).json({ message: 'Error in finding the team leader', error });
  }
};

module.exports = { getTeamLeader };

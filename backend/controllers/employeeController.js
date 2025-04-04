// controllers/employeeController.js

const getEmployees = (req, res) => {
  res.json({ message: "Fetch employees" });
};

// Correctly export as an object
module.exports = { getEmployees };




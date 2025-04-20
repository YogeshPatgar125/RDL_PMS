const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const projectRoutes = require('./routes/projectRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const complaintRoutes = require("./routes/complaintRoutes");
const taskRoutes = require("./routes/task");
const statsRoutes = require('./routes/stats'); // adjust path if needed


const { initializeAdmin } = require('./controllers/authController'); // Import function
require('dotenv').config();

const app = express();
connectDB();

// Initialize admin on server start
initializeAdmin();

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/tasks', require('./routes/tasks'));
app.use("/api/complaints", complaintRoutes);
app.use("/api/tasks", taskRoutes);
// Register routes
app.use('/api', statsRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

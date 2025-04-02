// server.js
const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors({
    origin: "http://localhost:3000", // Allow requests from frontend (React)
    methods: "GET,POST,PUT,DELETE",
    credentials: true // Allow cookies if needed
  }));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

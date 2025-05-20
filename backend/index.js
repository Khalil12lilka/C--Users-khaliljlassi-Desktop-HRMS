const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const employeeRoutes = require('./routes/employeeRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/employees', employeeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to HRMS API' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 
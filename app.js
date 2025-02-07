const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// Fetch the FRONTEND_URL from the environment variables (or fallback to localhost)
const FRONTEND_URL = process.env.FRONTEND_URL;

// Middleware to allow CORS only from the specified frontend URL
app.use(cors({
  origin: FRONTEND_URL, // Allow requests only from the frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies and credentials if needed
}));

require('dotenv').config();
const PORT = process.env.PORT || 3000;

// Database connection ;
const DB = require('./connection');
DB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth routes
const register = require('./authRoutes/register');
const login = require('./authRoutes/login');

app.use('/api/auth', register);
app.use('/api/auth', login);

// Protected routes
const auth = require('./middleware/auth');
const routes = require('./routes');
app.use('/api', auth, routes);

// Root endpoint for testing
app.get('/', (req, res) => {
  res.status(200).json({ message: 'App is working!' });
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});

module.exports = app;

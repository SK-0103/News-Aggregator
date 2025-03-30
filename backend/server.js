require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

// Route imports
const newsRoutes = require('./routes/newsRoutes');
const userRoutes = require('./routes/userRoutes');
const sourceRoutes = require('./routes/sourceRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Connect to MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30 seconds
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4, skip trying IPv6
};

mongoose.connect(MONGO_URI, options)
  .then(() => {
    console.log('MongoDB Atlas connected successfully');
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB Atlas connection error:', err);
  });

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sources', sourceRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('News Aggregator API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : null,
  });
});

module.exports = app;

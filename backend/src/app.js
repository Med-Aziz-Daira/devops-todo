const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Metrics endpoint (Prometheus will scrape this in Phase 8)
app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('# Metrics endpoint ready\n');
});

// API routes
app.use('/api/tasks', taskRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

module.exports = app;

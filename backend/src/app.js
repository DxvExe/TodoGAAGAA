const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

const clientOrigin = process.env.CLIENT_URL || '*';

app.use(cors({
  origin: clientOrigin === '*' ? true : clientOrigin,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/v1/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

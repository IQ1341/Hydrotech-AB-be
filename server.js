// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const sensorDataRoutes = require('./routes/sensorData');
const notificationRoutes = require('./routes/notificationRoutes'); // Import routes notifikasi
const errorHandler = require('./middleware/errorMiddleware');
const thresholdRoutes = require('./routes/thresholdRoutes');

const app = express();
const PORT = 5000; // Port default

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Koneksi ke MongoDB
const MONGO_URI = 'mongodb://127.0.0.1:27017/hydrotech'; // Ganti dengan nama database Anda
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/sensors', sensorDataRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/thresholds', thresholdRoutes);

// Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

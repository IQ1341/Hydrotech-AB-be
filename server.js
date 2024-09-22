// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const sensorDataRoutes = require('./routes/sensorData');
const notificationRoutes = require('./routes/notificationRoutes'); // Import routes notifikasi
const errorHandler = require('./middleware/errorMiddleware');
const thresholdRoutes = require('./routes/thresholdRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Routes
app.use('/api/sensor-data', sensorDataRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/thresholds', thresholdRoutes);

// Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

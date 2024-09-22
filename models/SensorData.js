// models/SensorData.js
const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
    ec: { type: Number, required: true },
    ph: { type: Number, required: true },
    do: { type: Number, required: true },
    temperature: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SensorData', SensorDataSchema);

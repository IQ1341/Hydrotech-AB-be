// models/Threshold.js
const mongoose = require('mongoose');

const thresholdSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['ec', 'ph', 'do', 'temperature'],
        required: true
    },
    min: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Threshold', thresholdSchema);

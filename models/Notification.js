// models/Notification.js
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { 
        type: String, 
        enum: ['info', 'alert', 'warning'], // tambahkan 'warning' sebagai nilai yang diizinkan
        required: true 
    },
    timestamp: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', NotificationSchema);

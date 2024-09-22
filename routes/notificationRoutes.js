// routes/notificationRoutes.js

const express = require('express');
const router = express.Router();
const { getNotifications, markNotificationAsRead, deleteNotification } = require('../controllers/notificationController');

router.get('/', getNotifications);
router.patch('/:id/read', markNotificationAsRead);
router.delete('/:id', deleteNotification); // Endpoint to delete notification

module.exports = router;

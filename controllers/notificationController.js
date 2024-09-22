const Notification = require('../models/Notification');

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const markNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        await Notification.findByIdAndUpdate(id, { isRead: true });
        res.status(200).send('Notification marked as read');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        await Notification.findByIdAndDelete(id);
        res.status(200).send('Notification deleted');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { getNotifications, markNotificationAsRead, deleteNotification };

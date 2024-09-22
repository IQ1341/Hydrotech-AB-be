const SensorData = require('../models/SensorData');
const Notification = require('../models/Notification');
const Threshold = require('../models/Threshold');

const checkThresholds = async (data) => {
    let notifications = [];
    const thresholds = await Threshold.find();

    const thresholdMap = thresholds.reduce((acc, threshold) => {
        acc[threshold.type] = threshold;
        return acc;
    }, {});

    if (data.ec < thresholdMap.ec.min || data.ec > thresholdMap.ec.max) {
        notifications.push(`Nilai EC (${data.ec}) diluar batas aman.`);
    }
    if (data.ph < thresholdMap.ph.min || data.ph > thresholdMap.ph.max) {
        notifications.push(`Nilai pH (${data.ph}) diluar batas aman.`);
    }
    if (data.do < thresholdMap.do.min || data.do > thresholdMap.do.max) {
        notifications.push(`Nilai DO (${data.do}) diluar batas aman.`);
    }
    if (data.temperature < thresholdMap.temperature.min || data.temperature > thresholdMap.temperature.max) {
        notifications.push(`Nilai Temperature (${data.temperature}) diluar batas aman.`);
    }

    return notifications;
};

const getSensorData = async (req, res) => {
    try {
        const data = await SensorData.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addSensorData = async (req, res) => {
    try {
        const newSensorData = new SensorData(req.body);
        await newSensorData.save();

        const notifications = await checkThresholds(req.body);

        if (notifications.length > 0) {
            await Notification.create({
                title: 'Peringatan Sensor !',
                message: notifications.join(', '),
                type: 'warning',
                timestamp: new Date(),
                isRead: false
            });
        }

        res.status(201).json(newSensorData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getSensorData, addSensorData };

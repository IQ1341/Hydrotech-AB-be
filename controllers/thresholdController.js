// controllers/thresholdController.js
const Threshold = require('../models/Threshold');

const getAllThresholds = async (req, res) => {
    try {
        const thresholds = await Threshold.find({});
        res.status(200).json(thresholds);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const setAllThresholds = async (req, res) => {
    try {
        const { ec, ph, temperature } = req.body;

        // Update or create thresholds
        const thresholds = [
            { type: 'ec', ...ec },
            { type: 'ph', ...ph },
            { type: 'temperature', ...temperature }
        ];

        for (const threshold of thresholds) {
            await Threshold.findOneAndUpdate(
                { type: threshold.type },
                threshold,
                { upsert: true, new: true }
            );
        }

        res.status(200).json({ message: 'Thresholds updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllThresholds, setAllThresholds };

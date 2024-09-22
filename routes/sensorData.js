const express = require('express');
const router = express.Router();
const { getSensorData, addSensorData } = require('../controllers/sensorController');

router.get('/', getSensorData);
router.post('/', addSensorData);

module.exports = router;

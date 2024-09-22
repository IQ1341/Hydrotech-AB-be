const express = require('express');
const router = express.Router();
const { setAllThresholds, getAllThresholds } = require('../controllers/thresholdController');

router.get('/', getAllThresholds); // Menambahkan route GET untuk mendapatkan thresholds
router.post('/set', setAllThresholds);

module.exports = router;

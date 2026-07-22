const express = require('express');
const router = express.Router();
const { getThreatsByWard } = require('../controllers/threat.controller');

router.get('/ward/:ward', getThreatsByWard);

module.exports = router;

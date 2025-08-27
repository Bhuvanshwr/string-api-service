const express = require('express');
const router = express.Router();
const { getStringinateResponse, getStatsResponse, updateSeenStrings } = require('../service/stringinatorService');

// Stringinate route
router.post('/stringinate', (req, res) => {
    const input = req.body.input || '';
    updateSeenStrings(input);
    res.json(getStringinateResponse(input));
});

// Stats route
router.get('/stats', (req, res) => {
    res.json(getStatsResponse());
});

module.exports = router;



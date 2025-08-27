const express = require('express');
const router = express.Router();
const { getStringinateResponse, getStatsResponse } = require('../service/stringinatorService');

// Stringinate route
router.post('/stringinate', (req, res) => {
    try{
    const input = req.body.input || '';
    res.json(getStringinateResponse(input));
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Stats route
router.get('/stats', (req, res) => {
    try{
    res.json(getStatsResponse());
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;



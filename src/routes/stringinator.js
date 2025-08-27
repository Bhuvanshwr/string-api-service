const express = require('express');
const router = express.Router();
const { getStringinateResponse, getStatsResponse } = require('../service/stringinatorService');
const logger = require('../utils/logger');

// Stringinate route
router.post('/stringinate', (req, res) => {
    try {
        logger.info('Received request for /stringinate');
        const input = req.body.input || '';
        res.json(getStringinateResponse(input));
        logger.debug(`Processed /stringinate for input: "${input}"`);
    } catch (error) {
        logger.error(`Error in /stringinate route: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Stats route
router.get('/stats', (req, res) => {
    try {
        logger.info('Received request for /stats');
        res.json(getStatsResponse());
    } catch (error) {
        logger.error(`Error in /stats route: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;



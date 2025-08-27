const express = require('express');
const bodyParser = require('body-parser');
const homeRoute = require('./src/routes/home');
const stringinatorRoute = require('./src/routes/stringinator');
const logger = require('./src/utils/logger');
const rateLimit = require('express-rate-limit');
const securityMiddleware = require('./src/middleware/security');

const app = express();
const port = 8080;

// Middleware
app.use(bodyParser.json());
app.use(rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 200, // Limit each IP to 30 requests per minute
}));

app.use('/', homeRoute);
app.use('/', securityMiddleware.basicAuth, stringinatorRoute);


// Start server
app.listen(port, () => {
    logger.info(`Stringinator service listening at http://localhost:${port}`);
});

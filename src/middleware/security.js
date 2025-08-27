const logger = require('../utils/logger');
const basicAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).send('Authentication required.');
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString();
    const [username, password] = credentials.split(':');

    const validUsername = process.env.STRING_SERVICE_USERNAME || 'admin';
    const validPassword = process.env.STRING_SERVICE_PASSWORD || 'password';

    if (username === validUsername && password === validPassword) {
        logger.debug(`user authneticated: ${username}`);
        return next();
    } else {
        logger.warn(`Failed login attempt for user: ${username}`);
        return res.status(401).send('Invalid credentials.');
    }
};



module.exports = { basicAuth }
    ;
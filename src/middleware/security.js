const logger = require('../utils/logger');
const db = require('../utils/db');
const basicAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).send('Authentication required.');
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString();
    const [username, password] = credentials.split(':');

    try {
        const data = db.find('users', { username: username })
        if (data[0]?.password !== password) {
            logger.warn(`Failed login attempt for user: ${username}`);
            return res.status(401).send('Invalid credentials.');
        }
        logger.debug(`user authenticated: ${username}`);
        next();
    }
    catch (err) {
        logger.error('Error during authentication:', err);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = { basicAuth }
    ;
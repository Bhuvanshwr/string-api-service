const winston = require('winston');

const logFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] [${level}]: ${message}`;
    })
);

// Create the logger
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    transports: [
        // Console transport with colors
        new winston.transports.Console({
            format: winston.format.combine(
                logFormat
            )
        })
    ]
});

module.exports = logger;
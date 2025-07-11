const { createLogger, transports, format } = require('winston');
const { timestamp, combine, printf } = format;
const path = require('path');
const fs = require('fs');

// Ensure logs directory exists
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// Function to generate log file name based on date (DDMMYYYY-api.log)
const getLogFileName = () => {
    const date = new Date();
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}${String(date.getMonth() + 1).padStart(2, '0')}${date.getFullYear()}`;
    return path.join(logDir, `${formattedDate}-api.log`);
};

// Define custom log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create logger
const logger = createLogger({
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    transports: [
        new transports.File({ filename: getLogFileName(), level: 'info' }), // Log only 'info' and higher levels
        new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }), // Separate error log
        // new transports.Console({ format: combine(timestamp(), logFormat) }) // Console log for development
    ],
});

// Function to delete log files older than 7 days
const deleteOldLogs = () => {
    try {
        const files = fs.readdirSync(logDir);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        files.forEach(file => {
            const match = file.match(/^(\d{2})(\d{2})(\d{4})-api\.log$/);
            if (match) {
                const fileDate = new Date(`${match[3]}-${match[2]}-${match[1]}`);
                const filePath = path.join(logDir, file);

                if (fileDate < sevenDaysAgo) {
                    fs.unlinkSync(filePath);
                    logger.info(`Deleted old log file: ${file}`);
                }
            }
        });
    } catch (error) {
        logger.error(`Error deleting old logs: ${error.message}`);
    }
};

// Run deleteOldLogs when the app starts
deleteOldLogs();

module.exports = logger;

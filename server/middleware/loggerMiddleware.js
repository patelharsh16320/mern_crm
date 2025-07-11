const logger = require("../utils/logger");

const logRequests = (req, res, next) => {
    let userName = "Guest";
    let userId = "NA";

    // Check if the request contains authorization data
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

            userId = decodedToken.id || "Guest";
            userName = decodedToken.name || "Guest";
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }

    const logMessage = `[User: ${userName} | ID: ${userId}] ${req.method} ${req.originalUrl} - ${req.ip}`;
    logger.info(logMessage);

    next();
};

module.exports = logRequests;
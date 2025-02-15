import winston from "winston";
import axios from "axios";

const LOGGING_SERVICE_URL = `http://${process.env.NODE_ENV != 'production' ? 'localhost' : 'logging-service'}:6000/log`;

// Create Winston Logger
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(), // Log to console
    ],
});

// Function to send logs to logging service
const logToCentralService = async (level, message) => {
    try {
        await axios.post(LOGGING_SERVICE_URL, {
            serviceName: process.env.SERVICE_NAME || "unknown-service",
            level,
            message,
        });
    } catch (error) {
        console.error("Failed to send log to logging service:", error.message);
    }
};

// Override console.log with Winston + Logging Service
console.log = (...args) => {
    const message = args.map(String).join(" ");
    logger.info(message);
    logToCentralService("info", message);
};

// Override console.error
console.error = (...args) => {
    const message = args.map(String).join(" ");
    logger.error(message);
    logToCentralService("error", message);
};

// Override other methods
console.warn = (...args) => {
    const message = args.map(String).join(" ");
    logger.warn(message);
    logToCentralService("warn", message);
};

console.info = console.log;
console.debug = console.log;

// module.exports = logger;
export default logger;

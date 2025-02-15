import winston from "winston";
import path from 'path';
import "winston-daily-rotate-file";

// Function to create logger for each microservice
function createLogger(serviceName) {
    return winston.createLogger({
        level: "info",
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.DailyRotateFile({
                filename: path.join(__dirname, `logs/${serviceName}/%DATE%.log`),
                datePattern: "YYYY-MM-DD",
                maxSize: "20m",
                maxFiles: "14d"
            })
        ],
    });
};

// module.exports = createLogger;
export default createLogger;

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
// const { createLogger } = require("./logger"); // Import createLogger = require("./logger");
import createLogger from "./logger"; // Add ".js" extension

const app = express();
app.use(bodyParser.json());
app.use(cors());

const loggers = {}; // Store loggers for different services dynamically

// Logging endpoint
app.post("/log", (req, res) => {
    const { serviceName, level, message } = req.body;

    if (!serviceName || !level || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Ensure log directory exists
        const logDir = path.join(__dirname, `logs/${serviceName}`);
        console.log("logDir", logDir)
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        // Create logger if it doesn't exist
        if (!loggers[serviceName]) {
            loggers[serviceName] = createLogger(serviceName);
        }

        loggers[serviceName].log({ level, message });

        res.json({ success: true, message: "Log stored successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Logging service running on port ${PORT}`));

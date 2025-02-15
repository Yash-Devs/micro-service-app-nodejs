import "./logger"; // This overrides console.log globally
// Import express application
import app from './app';

// Get the port from environment variables or use default value
const PORT = process.env.PORT ?? 4000;

// Start server
app.listen(PORT, () => {
    // Log a message when the server is running
    console.log(`Gateway service is running on http://localhost:${PORT}`);
});


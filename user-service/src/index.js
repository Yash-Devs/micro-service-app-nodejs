// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Import express application
import app from './app';

// Get the port from environment variables or use default value
const PORT = process.env.APP_PORT ?? 4002;

// Start server
app.listen(PORT, () => {
  // Log a message when the server is running
  console.log(`User service is running on http://localhost:${PORT}`);
});

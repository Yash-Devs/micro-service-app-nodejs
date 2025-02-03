// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Import express application
import app from './app';

// Get the port from environment variables or use default value
const PORT = process.env.PORT ?? 4001;

// Start server
app.listen(PORT, () => {
  // Log a message when the server is running
  console.log(`Auth service is running on http://localhost:${PORT}`);
});


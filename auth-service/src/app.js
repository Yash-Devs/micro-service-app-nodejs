import express from "express";
import bodyParser from 'body-parser';
import { authRoutes } from './routes/authRoutes';
import connectDB from './db';

const app = express();

// Middleware
// Parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
// Handle authentication routes
app.use("/", authRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something went wrong!');
});

export default app;
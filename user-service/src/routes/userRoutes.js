import express from 'express';
import { getUserProfile } from '../controllers/userController';

// Router for user routes
const router = express.Router();

// Get the profile of the user making the request
router.get("/profile", getUserProfile);

export { router as userRoutes };

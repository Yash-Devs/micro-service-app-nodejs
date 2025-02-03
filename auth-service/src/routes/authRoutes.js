import express from 'express';
import { login, register } from '../controllers/authController';

/**
 * Router for authentication routes.
 */
const router = express.Router();

/**
 * Logs in an existing user.
 */
router.post("/login", login);

/**
 * Registers a new user.
 */
router.post("/register", register);

export { router as authRoutes };

import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../configs/jwtConfig';

/**
 * Middleware to verify the token passed in the Authorization header.
 * If the token is valid, it will be decoded and the user details will be
 * stored in the request object.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const verifyToken = async (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.headers["authorization"]?.replace("Bearer ", "");

    // If no token is provided, return 401 Unauthorized
    if (!token)
        return res.status(401).send({ message: "No token provided!" });

    try {
        // Verify the token using the secret key
        const user = await jwt.verify(token, JWT_SECRET_KEY);
        // Store the user details in the request object
        req.user = user;
        // Call the next middleware
        next();
    } catch (err) {
        // Log the error and return 403 Forbidden
        console.log("Error while verifying token", err);
        return res.sendStatus(403);
    }
};

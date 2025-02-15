import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET_KEY } from '../configs/jwtConfig';
import User from '../models/Users';

// Mock database
// const users = [];

/**
 * Registers a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const register = async (req, res) => {
    const { userName, password, name, email, age } = req.body;

    // Find the user in the database
    const user = await User.findOne({ email });
    // Check if the user already exists
    // const user = users.find(user => user.email == email);
    if (user)
        return res.status(409).send({ message: "User already exists" });

    // Hash the password
    const hashPassword = bcrypt.hashSync(password, 10);

    // Add the user to the database
    const newUser = new User({ userName, password: hashPassword, name, email, age });
    await newUser.save();
    // users.push({ userName, email, password: hashPassword });

    return res.send({ message: "User created successfully" });
};

/**
 * Logs in an existing user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const login = async (req, res) => {
    const { userName, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ userName });
    if (!user)
        return res.status(401).send({ message: "Invalid credentials" });

    // Check the password
    if (bcrypt.compareSync(password, user.password)) {
        // Create a JWT token with the user's email
        const payload = { email: user.email };
        const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
        return res.send({ token });
    } else {
        return res.status(401).send({ message: "Invalid credentials" });
    }
};

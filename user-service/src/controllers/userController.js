import User from '../models/Users';

/**
 * Returns the profile of the user making the request.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getUserProfile = async (req, res) => {
    const user = await User.findOne({ email: req.user.email })
        .select('-_id -password -userName -__v');
    res.send({ user: user });
};

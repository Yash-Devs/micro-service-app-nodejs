/**
 * Returns the profile of the user making the request.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getUserProfile = async (req, res) => {
    res.send({ user: req.user });
};

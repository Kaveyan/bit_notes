const jwt = require('jsonwebtoken');
const { User } = require('../model/userModel');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token from the header
            token = req.headers.authorization.split(' ')[1];
            console.log('Token:', token);

            // Verify the token
            const decoded = jwt.verify(token, 'your_jwt_secret');

            // Find the user by ID from the decoded token payload
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }

            // If user is found, proceed to the next middleware or route handler
            next();
        } catch (error) {
            console.error('Token verification error:', error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };

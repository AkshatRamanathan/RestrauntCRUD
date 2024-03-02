const jwt = require('jsonwebtoken');
const config = require('../config'); // Make sure to have a config file with your JWT secret

// Function to generate a JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        config.jwtSecret,
        { expiresIn: '1h' } // Token expires in 1 hour
    );
};

// Function to verify a JWT token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (error) {
        return null;
    }
};

// Middleware to protect routes and verify token
const verifyTokenMiddleware = (req, res, next) => {
    const token = req.cookies.authToken; // Assuming the token is sent in a cookie

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Add the user payload to the request object
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};

module.exports = {
    generateToken,
    verifyToken,
    verifyTokenMiddleware
};

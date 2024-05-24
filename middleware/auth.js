const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No user is signed-in' });
        }

        const decoded = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjNiN2YyY2YzNDEwYzI0OWM4YmQ3Y2IiLCJpYXQiOjE3MTUxNzUzNDIsImV4cCI6MTcxNTE3ODk0Mn0.1rRAmg-Femw-Rf2CPFVwTW7gvF66uMyHavYL8wCPBY0');
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error Middleware' });
    }
};

module.exports = authMiddleware;

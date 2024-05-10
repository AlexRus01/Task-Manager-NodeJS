const jwt = require('jsonwebtoken');
const User = require('../models/User');
// Example function to sign a token using your secret key
function generateToken(user) {
  const payload = { userId: user._id };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

//localStorage.setItem('authToken', token);
const authMiddleware = async (req, res, next) => {
  console.log('Auth Middleware reached');

  // Log all headers to debug missing information
  console.log('Received headers:', req.headers);

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Authorization header missing or improperly formatted');
    return res.status(401).json({ msg: 'Authorization header missing or improperly formatted' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure your secret matches
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    req.user = user;
    next(); // Proceed to the next middleware
  } catch (err) {
    console.error('JWT verification error:', err);
    return res.status(505).json({ msg: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;

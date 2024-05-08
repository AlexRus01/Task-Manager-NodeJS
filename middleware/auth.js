const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Missing or improperly formatted Authorization header');
    return res.status(401).json({ msg: 'Authorization header missing or improperly formatted' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Log the token for debugging purposes
    console.log('Verifying token:', token);

    const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace with your actual secret
    console.log('Decoded user info:', decoded);

    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    res.status(401).json({ msg: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;

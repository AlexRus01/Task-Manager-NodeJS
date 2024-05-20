// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.token; // Get the token from cookies
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjNiN2YyY2YzNDEwYzI0OWM4YmQ3Y2IiLCJpYXQiOjE3MTUxNzUzNDIsImV4cCI6MTcxNTE3ODk0Mn0.1rRAmg-Femw-Rf2CPFVwTW7gvF66uMyHavYL8wCPBY0'); // Replace with your secret
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;

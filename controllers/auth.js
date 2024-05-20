// controllers/auth.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    const token = jwt.sign({ userId: user._id }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjNiN2YyY2YzNDEwYzI0OWM4YmQ3Y2IiLCJpYXQiOjE3MTUxNzUzNDIsImV4cCI6MTcxNTE3ODk0Mn0.1rRAmg-Femw-Rf2CPFVwTW7gvF66uMyHavYL8wCPBY0', {
      expiresIn: '1h',
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};




const signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjNiN2YyY2YzNDEwYzI0OWM4YmQ3Y2IiLCJpYXQiOjE3MTUxNzUzNDIsImV4cCI6MTcxNTE3ODk0Mn0.1rRAmg-Femw-Rf2CPFVwTW7gvF66uMyHavYL8wCPBY0', {
      expiresIn: '1h',
    });
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.status(200).json({ msg: 'Login successful' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    console.log("am ajuns in getcurrentuser")
    // Add logging to understand what information is missing
    console.log('Request user object:', req.body.username);
    
    // Verify if `req.user` is correctly populated
    if (!req.user || !req.user._id) {
      console.error('User information missing in request.');
      return res.status(405).json({ msg: 'Unauthorized: No user information available' });
    }

    // Find user by their ID without the password
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(406).json({ msg: 'User not found' });
    }

    // Return user info without sensitive data
    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    res.status(500).json({ msg: 'Server error in the function' });
  }
};
// controllers/auth.js
const checkAuth = async (req, res) => {
  try {
    console.log("checkauth");
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ msg: 'Unauthorized: No user information available' });
    }
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error in checkAuth:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};



module.exports = { signup, signin, getCurrentUser, checkAuth };

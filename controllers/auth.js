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
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const getCurrentUser = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      console.error('User information missing in request.');
      return res.status(401).json({ msg: 'Unauthorized: No user information available' });
    }

    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Return user info without sensitive data
    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    res.status(500).json({ msg: 'Server error in the function' });
  }
};

module.exports = { signup, signin, getCurrentUser };

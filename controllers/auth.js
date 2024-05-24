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
    console.log(req.body.username);
    
    if (!req.user || !req.user._id) {
      console.error();
      return res.status(405).json({ msg: 'Unauthorized' });
    }

    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(406).json({ msg: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    res.status(500).json({ msg: 'Server error in the function' });
  }
};

const checkAuth = async (req, res) => {
  try {
    console.log("checkauth");
    if (!req.user || !req.user._id) {
      return res.status(401).json({ msg: 'Unauthorized: No user information available' });
    }
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error in checkAuth:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    await User.findByIdAndDelete(req.user._id);
    res.status(200).json({ msg: 'User deleted successfully' });
  } catch (error) {
    console.error('Error in deleteUser:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.error('Error in updateUser:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { signup, signin, getCurrentUser, checkAuth, deleteUser, updateUser };

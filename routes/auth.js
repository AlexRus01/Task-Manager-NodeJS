const express = require('express');
const { signup, signin, getCurrentUser } = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// User sign-up route
router.post('/signup', signup);

// User sign-in route
router.post('/signin', signin);

// Get current user info (protected route)
router.get('/me',authMiddleware, getCurrentUser);

module.exports = router;

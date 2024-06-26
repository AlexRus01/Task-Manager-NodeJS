const express = require('express');
const { signup, signin, getCurrentUser, checkAuth, deleteUser, updateUser } = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// User sign-up route
router.post('/signup', signup);

// User sign-in route
router.post('/signin', signin);

// Get current user info (protected route)
router.get('/me',authMiddleware, getCurrentUser);
router.get('/checkAuth',authMiddleware,checkAuth);
router.delete('/delete', authMiddleware, deleteUser);
router.put('/update', authMiddleware, updateUser);
module.exports = router;

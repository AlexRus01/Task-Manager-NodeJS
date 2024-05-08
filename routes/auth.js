// routes/auth.js
const express = require('express');
const { signup, signin, getCurrentUser } = require('../controllers/auth');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // Ensure this middleware verifies the JWT

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/me', getCurrentUser); // Current user endpoint
module.exports = router;

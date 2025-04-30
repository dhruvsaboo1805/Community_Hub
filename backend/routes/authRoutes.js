const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');

// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

// User Profile Route (secured)
router.get('/profile', protect, getUserProfile);

module.exports = router;

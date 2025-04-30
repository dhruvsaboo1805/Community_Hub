const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get Profile
router.get('/profile', authMiddleware, userController.getProfile);

// Get Transactions
router.get('/transactions', authMiddleware, userController.getTransactions);

// Update Profile (optional)
router.put('/update', authMiddleware, userController.updateProfile);

module.exports = router;

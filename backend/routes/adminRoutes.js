const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

// Admin APIs
router.get('/reports', authMiddleware, adminController.getReports);
router.delete('/feed/:feedId', authMiddleware, adminController.deleteFeed);
router.delete('/user/:userId', authMiddleware, adminController.deleteUser);
router.get('/analytics', authMiddleware, adminController.getAnalytics);

module.exports = router;

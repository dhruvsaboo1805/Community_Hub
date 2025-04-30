const express = require('express');
const router = express.Router();
const { addCredits, spendCredits, getCreditHistory } = require('../controllers/creditController');
const protect = require('../middlewares/authMiddleware');


// Earn Credits
router.post('/earn', protect, addCredits);

// Spend Credits
router.post('/spend', protect, spendCredits);

// Get Credit History
router.get('/history', protect, getCreditHistory);

module.exports = router;
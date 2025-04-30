const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');
const authMiddleware = require('../middlewares/authMiddleware'); 


router.post('/add', authMiddleware, feedController.addFeed);

// GET all feeds (with lock/unlock check)
router.get('/', authMiddleware, feedController.getFeeds);

// Save a feed for later
router.post('/save/:id', authMiddleware, feedController.saveFeed);

// Share a feed
router.post('/share/:id', authMiddleware, feedController.shareFeed);

// Report a feed
router.post('/report/:id', authMiddleware, feedController.reportFeed);

module.exports = router;

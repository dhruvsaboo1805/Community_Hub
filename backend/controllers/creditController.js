const User = require('../models/user');
const Transaction = require('../models/Transaction');
const FeedItem = require('../models/FeedItem');

// Add Credits (Earn Credits)
const addCredits = async (req, res) => {
  try {
    const userId = req.userId; 
    const { points, reason } = req.body; 

    // Validate the points value
    if (!points || points <= 0) {
      return res.status(400).json({ message: 'Invalid points value' });
    }

    // Find the user and update their total credits
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's total credits
    user.totalCredits += points;
    await user.save();

    // Log the transaction (credits earned)
    const transaction = new Transaction({
      user: userId,
      points,
      transactionType: 'earned',
      reason,
      timestamp: new Date(),
    });

    await transaction.save();

    res.status(200).json({
      message: 'Credits added successfully',
      totalCredits: user.totalCredits,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Spend Credits
const spendCredits = async (req, res) => {
    try {
      const userId = req.userId; 
      const { points, reason, feedId } = req.body; 
  
      // Validate points
      if (!points || points <= 0) {
        return res.status(400).json({ message: 'Invalid points value' });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.totalCredits < points) {
        return res.status(400).json({ message: 'Not enough credits' });
      }
  
      // OPTIONAL: If feedId provided, validate it exists
      if (feedId) {
        const feed = await FeedItem.findById(feedId);
        if (!feed) {
          return res.status(404).json({ message: 'Feed item not found' });
        }
  
        // OPTIONAL (depends how you want to model unlock): 
        // Mark the feed as unlocked for the user
        if (!user.unlockedFeeds.includes(feedId)) {
          user.unlockedFeeds.push(feedId);
        }
      }
  
      // Deduct points
      user.totalCredits -= points;
      await user.save();
  
      // Create transaction
      const transaction = new Transaction({
        user: userId,
        points,
        transactionType: 'spent',
        reason,
        feedId: feedId || null, // Save feedId in transaction if exists
        timestamp: new Date(),
      });
  
      await transaction.save();
  
      res.status(200).json({
        message: 'Credits spent successfully',
        totalCredits: user.totalCredits,
        unlockedFeed: feedId || null,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Get Credit History (All Transactions for the User)
const getCreditHistory = async (req, res) => {
  try {
    const userId = req.userId; 

    // Fetch all transactions for the user
    const transactions = await Transaction.find({ user: userId })
      .sort({ timestamp: -1 }) // Sort transactions by most recent first
      .exec();

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: 'No credit history found' });
    }

    res.status(200).json({
      transactions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addCredits,
  spendCredits,
  getCreditHistory,
};

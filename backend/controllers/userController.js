const User = require('../models/user');
const Transaction = require('../models/Transaction');
const FeedItem = require('../models/FeedItem');

// Get User Profile (details + saved feeds + credit stats)
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('savedFeeds') 
      .select('-password'); 

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get User's Transaction History
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.userId }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    console.error('Get Transactions Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Optionally: Update User Profile
const updateProfile = async (req, res) => {
  try {
    const { username, profilePicture } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { username, profilePicture },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
    getProfile,
    getTransactions,
    updateProfile
};
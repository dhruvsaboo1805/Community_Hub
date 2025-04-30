const User = require('../models/user');
const FeedItem = require('../models/FeedItem');
const Report = require('../models/Report');

// Get all Reports (for Admin to review flagged feeds)
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('feedId', 'title source isLocked') // show feed details
      .populate('reportedBy', 'username email');   // show who reported

    res.json(reports);
  } catch (error) {
    console.error('Get Reports Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a Feed Item (admin decision after reviewing report)
exports.deleteFeed = async (req, res) => {
  try {
    const { feedId } = req.params;

    await FeedItem.findByIdAndDelete(feedId);

    res.json({ message: 'Feed deleted successfully' });
  } catch (error) {
    console.error('Delete Feed Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Ban (Delete) a User (admin action)
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await User.findByIdAndDelete(userId);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete User Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get Analytics (Top saved feeds, Most active users)
exports.getAnalytics = async (req, res) => {
  try {
    // Most Saved Feeds
    const topFeeds = await FeedItem.find().sort({ saves: -1 }).limit(5);

    // Most Active Users
    const activeUsers = await User.find().sort({ totalCoins: -1 }).limit(5).select('username totalCoins');

    res.json({ topFeeds, activeUsers });
  } catch (error) {
    console.error('Analytics Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

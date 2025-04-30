const FeedItem = require('../models/FeedItem');
const User = require('../models/user');
const Report = require('../models/Report');

// Add new feed to the database (Admin/Backend use only)
const addFeed = async (req, res) => {
  try {
    const { title, preview, source, sourceLink, postedAt } = req.body;

    // Validate
    if (!title || !preview || !source || !sourceLink || !postedAt) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new FeedItem
    const newFeed = new FeedItem({
      title,
      preview,
      source,
      sourceLink,
      postedAt,
    });

    await newFeed.save();

    res.status(201).json({ message: 'Feed created successfully', feed: newFeed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 1. Fetch all feeds (with lock/unlock check)
const getFeeds = async (req, res) => {
  try {
    const userId = req.userId; 
    const user = await User.findById(userId);

    const feeds = await FeedItem.find();

    const feedData = feeds.map(feed => {
      const isUnlocked = user.unlockedFeeds.includes(feed._id);
      return {
        _id: feed._id,
        title: feed.title,
        content: feed.content,
        source: feed.source,
        isLocked: feed.isPremium ? !isUnlocked : false, // yha hain locked unloacked feature
      };
    });

    res.status(200).json(feedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 2. Save feed for later
const saveFeed = async (req, res) => {
  try {
    const userId = req.userId;
    const feedId = req.params.id;

    const user = await User.findById(userId);

    if (!user.savedFeeds.includes(feedId)) {
      user.savedFeeds.push(feedId);
      await user.save();
    }

    res.status(200).json({ message: 'Feed saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 3. Share feed
const shareFeed = async (req, res) => {
  try {
    const userId = req.userId;
    const feedId = req.params.id;

    // OPTIONAL: Reward points for sharing
    const user = await User.findById(userId);  // yeh dekhte hain abhi

    // Logic to add bonus points for sharing
    user.totalCredits += 5; // example: +5 points for sharing
    await user.save();

    res.status(200).json({ message: 'Feed shared successfully, bonus credits awarded' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 4. Report feed
const reportFeed = async (req, res) => {
  try {
    const userId = req.userId;
    const feedId = req.params.id;
    const { reason } = req.body;

    const report = new Report({
      feedItem: feedId,
      reportedBy: userId,
      reason,
      createdAt: new Date()
    });

    await report.save();

    res.status(200).json({ message: 'Feed reported successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addFeed,
  getFeeds,
  saveFeed,
  shareFeed,
  reportFeed,
};

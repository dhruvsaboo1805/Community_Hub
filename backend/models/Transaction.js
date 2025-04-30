const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  feedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FeedItem',
    required: false
  },

  amount: {
    type: Number,
    required: true
  },

  type: {
    type: String,
    enum: ['earn', 'spend'],
    required: true
  },

  purpose: {
    type: String, // 'Watched Content', 'Shared Feed', etc
    required: true
  },

  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);

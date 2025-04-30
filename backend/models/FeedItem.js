const mongoose = require('mongoose');

const feedItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  preview: {
    type: String,
    required: true
  },

  source: {
    type: String,
    enum: ['twitter', 'reddit', 'linkedin'], // youtube
    required: true
  },

  sourceLink: {
    type: String,
    required: true
  },

  postedAt: {
    type: Date,
    required: true
  },

  savedCount: {
    type: Number,
    default: 0
  },

  reportCount: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model('FeedItem', feedItemSchema);

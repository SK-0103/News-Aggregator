const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    content: {
      type: String,
      required: [true, 'Please add content'],
    },
    url: {
      type: String,
      required: [true, 'Please add a URL'],
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS',
      ],
    },
    urlToImage: {
      type: String,
      required: false,
    },
    publishedAt: {
      type: Date,
      required: [true, 'Please add a published date'],
    },
    source: {
      type: mongoose.Schema.ObjectId,
      ref: 'Source',
      required: [true, 'Please add a source'],
    },
    category: {
      type: String,
      enum: [
        'general',
        'business',
        'entertainment',
        'health',
        'science',
        'sports',
        'technology',
        'politics',
      ],
      default: 'general',
    },
    politicalBias: {
      type: String,
      enum: ['left', 'center-left', 'center', 'center-right', 'right', 'unknown'],
      default: 'unknown',
    },
    author: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for search functionality
NewsSchema.index({ title: 'text', description: 'text', content: 'text' });

module.exports = mongoose.model('News', NewsSchema);

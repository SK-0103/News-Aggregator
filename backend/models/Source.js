const mongoose = require('mongoose');

const SourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a source name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    url: {
      type: String,
      required: [true, 'Please add a URL'],
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS',
      ],
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
    language: {
      type: String,
      default: 'en',
    },
    country: {
      type: String,
      default: 'us',
    },
    politicalBias: {
      type: String,
      enum: ['left', 'center-left', 'center', 'center-right', 'right', 'unknown'],
      default: 'unknown',
    },
    reliability: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },
    logoUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Source', SourceSchema);

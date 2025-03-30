export const NEWS_API_CONFIG = {
  // NewsAPI.org (Free tier - 100 requests/day)
  NEWS_API_KEY: '17e484c403a14f3ca2a7ef7d4eb9a9b1',
  NEWS_API_BASE_URL: 'https://newsapi.org/v2',

  // Sources with different political biases
  SOURCES: {
    LEFT: [
      'the-intercept',
      'the-huffington-post',
      'the-washington-post',
      'the-new-york-times',
    ],
    CENTER: [
      'reuters',
      'associated-press',
      'the-wall-street-journal',
      'cnn',
    ],
    RIGHT: [
      'fox-news',
      'the-economist',
      'the-guardian-uk',
      'the-washington-times',
    ],
  },

  // Categories supported by NewsAPI
  CATEGORIES: [
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
  ],

  // API Endpoints
  ENDPOINTS: {
    TOP_HEADLINES: '/top-headlines',
    EVERYTHING: '/everything',
    SOURCES: '/sources',
  },

  // Default settings
  DEFAULTS: {
    country: 'us',
    language: 'en',
    pageSize: 20,
  },
};

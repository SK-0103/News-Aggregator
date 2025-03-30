export const NEWS_API_CONFIG = {
  NEWS_API_BASE_URL: 'https://newsapi.org/v2',
  NEWS_API_KEY: '17e484c403a14f3ca2a7ef7d4eb9a9b1',
  
  // Default parameters for API requests
  DEFAULTS: {
    language: 'en',
    pageSize: 20, // Increased from 12 to 20 articles per page
    sortBy: 'publishedAt',
  },

  // News sources categorized by political bias
  SOURCES: {
    LEFT: [
      'the-washington-post',
      'the-new-york-times',
      'the-huffington-post',
      'the-guardian-uk',
      'the-guardian-au',
      'the-irish-times',
      'the-new-yorker',
      'the-verge',
      'techcrunch',
      'buzzfeed',
      'cnn',
      'msnbc',
      'nbc-news',
      'abc-news',
      'the-washington-post',
      'the-irish-times'
    ],
    CENTER: [
      'reuters',
      'associated-press',
      'the-wall-street-journal',
      'the-economist',
      'time',
      'the-washington-times',
      'the-hill',
      'the-atlantic',
      'the-sydney-morning-herald',
      'the-times-of-india',
      'the-hindu',
      'the-times-of-india',
      'the-hindu',
      'the-times-of-india',
      'the-hindu'
    ],
    RIGHT: [
      'fox-news',
      'the-sun',
      'the-australian',
      'the-wall-street-journal',
      'the-hill',
      'the-washington-times',
      'the-guardian-uk',
      'the-guardian-au',
      'the-irish-times',
      'the-new-yorker',
      'the-verge',
      'techcrunch',
      'buzzfeed',
      'cnn',
      'msnbc',
      'nbc-news',
      'abc-news',
      'the-washington-post',
      'the-irish-times'
    ]
  },

  // API Endpoints
  ENDPOINTS: {
    TOP_HEADLINES: '/top-headlines',
    EVERYTHING: '/everything',
    SOURCES: '/sources'
  }
};

export const NEWS_API_CONFIG = {
  API_KEY: '17e484c403a14f3ca2a7ef7d4eb9a9b1',
  BASE_URL: 'https://newsapi.org/v2',
  
  SOURCES: {
    LEFT: [
      'the-washington-post',
      'new-york-times',
      'cnn',
      'msnbc',
      'the-huffington-post'
    ],
    CENTER: [
      'reuters',
      'associated-press',
      'the-economist',
      'time',
      'the-wall-street-journal'
    ],
    RIGHT: [
      'fox-news',
      'the-sun',
      'the-australian',
      'breitbart-news',
      'the-daily-mail'
    ]
  },

  CATEGORY_SOURCES: {
    technology: [
      'techcrunch',
      'the-verge',
      'cnet',
      'wired',
      'techradar'
    ],
    business: [
      'financial-times',
      'the-wall-street-journal',
      'business-insider',
      'fortune',
      'forbes'
    ],
    entertainment: [
      'entertainment-weekly',
      'the-hollywood-reporter',
      'variety',
      'buzzfeed',
      'vulture'
    ],
    sports: [
      'espn',
      'the-sports-network',
      'bleacher-report',
      'fox-sports',
      'talksport'
    ],
    health: [
      'medical-news-today',
      'medical-express',
      'healthline',
      'medicalxpress',
      'medical-journal-of-australia'
    ],
    science: [
      'nature',
      'science-news',
      'scientific-american',
      'new-scientist',
      'national-geographic'
    ],
    politics: [
      'politico',
      'the-hill',
      'the-washington-post',
      'the-guardian-uk',
      'the-new-yorker'
    ]
  },

  DEFAULTS: {
    country: 'in',
    language: 'en',
    pageSize: 20,
    sortBy: 'publishedAt'
  }
};

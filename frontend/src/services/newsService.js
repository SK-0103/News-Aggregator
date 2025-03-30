import axios from 'axios';
import { NEWS_API_CONFIG } from '../config/apiConfig';

const axiosInstance = axios.create({
  baseURL: NEWS_API_CONFIG.NEWS_API_BASE_URL,
  headers: {
    'X-Api-Key': NEWS_API_CONFIG.NEWS_API_KEY,
  },
});

// Helper function to format API response
const formatResponse = (response) => {
  const articles = response.articles || [];
  
  // Add bias information based on source ID
  const articlesWithBias = articles.map(article => {
    const sourceId = article.source.id || article.source.name.toLowerCase();
    let bias = 'unknown';
    
    // Check which bias category the source belongs to
    Object.entries(NEWS_API_CONFIG.SOURCES).forEach(([biasType, sources]) => {
      if (sources.includes(sourceId)) {
        bias = biasType;
      }
    });

    return {
      ...article,
      source: {
        ...article.source,
        bias
      }
    };
  });

  return {
    articles: articlesWithBias,
    totalResults: response.totalResults || 0,
  };
};

export const getTopHeadlines = async (params = {}) => {
  try {
    const response = await axiosInstance.get(NEWS_API_CONFIG.ENDPOINTS.TOP_HEADLINES, {
      params: {
        ...NEWS_API_CONFIG.DEFAULTS,
        ...params,
      },
    });
    return formatResponse(response.data);
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error;
  }
};

export const getEverything = async (params = {}) => {
  try {
    const response = await axiosInstance.get(NEWS_API_CONFIG.ENDPOINTS.EVERYTHING, {
      params: {
        ...NEWS_API_CONFIG.DEFAULTS,
        ...params,
      },
    });
    return formatResponse(response.data);
  } catch (error) {
    console.error('Error fetching everything:', error);
    throw error;
  }
};

export const getSources = async (params = {}) => {
  try {
    const response = await axiosInstance.get(NEWS_API_CONFIG.ENDPOINTS.SOURCES, {
      params: {
        ...NEWS_API_CONFIG.DEFAULTS,
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sources:', error);
    throw error;
  }
};

export const getNewsByCategory = async (category) => {
  try {
    const response = await axiosInstance.get(NEWS_API_CONFIG.ENDPOINTS.TOP_HEADLINES, {
      params: {
        ...NEWS_API_CONFIG.DEFAULTS,
        category: category.toLowerCase(),
      },
    });
    return formatResponse(response.data);
  } catch (error) {
    console.error('Error fetching news by category:', error);
    throw error;
  }
};

export const getNewsBySource = async (sourceId) => {
  try {
    const response = await axiosInstance.get(NEWS_API_CONFIG.ENDPOINTS.TOP_HEADLINES, {
      params: {
        ...NEWS_API_CONFIG.DEFAULTS,
        sources: sourceId,
      },
    });
    return formatResponse(response.data);
  } catch (error) {
    console.error('Error fetching news by source:', error);
    throw error;
  }
};

export const searchNews = async (query) => {
  try {
    const response = await axiosInstance.get(NEWS_API_CONFIG.ENDPOINTS.EVERYTHING, {
      params: {
        ...NEWS_API_CONFIG.DEFAULTS,
        q: query,
      },
    });
    return formatResponse(response.data);
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};

import {
  NEWS_LIST_REQUEST,
  NEWS_LIST_SUCCESS,
  NEWS_LIST_FAIL,
  NEWS_DETAILS_REQUEST,
  NEWS_DETAILS_SUCCESS,
  NEWS_DETAILS_FAIL,
  NEWS_BY_CATEGORY_REQUEST,
  NEWS_BY_CATEGORY_SUCCESS,
  NEWS_BY_CATEGORY_FAIL,
  NEWS_BY_SOURCE_REQUEST,
  NEWS_BY_SOURCE_SUCCESS,
  NEWS_BY_SOURCE_FAIL,
  NEWS_BY_BIAS_REQUEST,
  NEWS_BY_BIAS_SUCCESS,
  NEWS_BY_BIAS_FAIL,
  NEWS_SEARCH_REQUEST,
  NEWS_SEARCH_SUCCESS,
  NEWS_SEARCH_FAIL
} from '../constants/newsConstants';

import { getTopHeadlines, searchNews as searchNewsAPI } from '../../services/newsService';
import { NEWS_API_CONFIG } from '../../config/apiConfig';

// Get all news with pagination
export const listNews = (page = 1, limit = 10) => async (dispatch) => {
  try {
    dispatch({ type: NEWS_LIST_REQUEST });

    const { articles, totalResults } = await getTopHeadlines({
      page: page,
      pageSize: limit,
    });

    dispatch({
      type: NEWS_LIST_SUCCESS,
      payload: {
        data: articles,
        pages: Math.ceil(totalResults / limit),
        page
      },
    });
  } catch (error) {
    dispatch({
      type: NEWS_LIST_FAIL,
      payload: error.message,
    });
  }
};

// Get news details by ID
export const getNewsDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: NEWS_DETAILS_REQUEST });

    // Get the article details from the API
    const { articles } = await getTopHeadlines({
      q: id,
      pageSize: 1,
    });

    const article = articles[0];

    dispatch({
      type: NEWS_DETAILS_SUCCESS,
      payload: article,
    });
  } catch (error) {
    dispatch({
      type: NEWS_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

// Get news by category
export const getNewsByCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: NEWS_BY_CATEGORY_REQUEST });

    const { articles, totalResults } = await getTopHeadlines({
      category: category.toLowerCase(),
    });

    dispatch({
      type: NEWS_BY_CATEGORY_SUCCESS,
      payload: {
        data: articles,
        total: totalResults
      },
    });
  } catch (error) {
    dispatch({
      type: NEWS_BY_CATEGORY_FAIL,
      payload: error.message,
    });
  }
};

// Get news by political bias
export const getNewsByBias = (bias) => async (dispatch) => {
  try {
    dispatch({ type: NEWS_BY_BIAS_REQUEST });

    const sources = NEWS_API_CONFIG.SOURCES[bias.toUpperCase()];
    const sourceIds = sources.join(',');

    const { articles, totalResults } = await getTopHeadlines({
      sources: sourceIds,
    });

    dispatch({
      type: NEWS_BY_BIAS_SUCCESS,
      payload: {
        data: articles,
        total: totalResults
      },
    });
  } catch (error) {
    dispatch({
      type: NEWS_BY_BIAS_FAIL,
      payload: error.message,
    });
  }
};

// Search news
export const searchNews = (query) => async (dispatch) => {
  try {
    dispatch({ type: NEWS_SEARCH_REQUEST });

    const { articles, totalResults } = await searchNewsAPI(query);

    dispatch({
      type: NEWS_SEARCH_SUCCESS,
      payload: {
        data: articles,
        total: totalResults
      },
    });
  } catch (error) {
    dispatch({
      type: NEWS_SEARCH_FAIL,
      payload: error.message,
    });
  }
};

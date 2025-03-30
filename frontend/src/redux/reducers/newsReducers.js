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
  NEWS_SEARCH_FAIL,
  NEWS_SEARCH_RESET
} from '../constants/newsConstants';

export const newsListReducer = (state = { news: [] }, action) => {
  switch (action.type) {
    case NEWS_LIST_REQUEST:
      return { loading: true, news: [] };
    case NEWS_LIST_SUCCESS:
      return {
        loading: false,
        news: action.payload.data,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case NEWS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const newsDetailsReducer = (state = { news: { source: {} } }, action) => {
  switch (action.type) {
    case NEWS_DETAILS_REQUEST:
      return { loading: true, ...state };
    case NEWS_DETAILS_SUCCESS:
      return { loading: false, news: action.payload };
    case NEWS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const newsByCategoryReducer = (state = { news: [] }, action) => {
  switch (action.type) {
    case NEWS_BY_CATEGORY_REQUEST:
      return { loading: true, news: [] };
    case NEWS_BY_CATEGORY_SUCCESS:
      return {
        loading: false,
        news: action.payload.data,
        total: action.payload.total,
      };
    case NEWS_BY_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const newsBySourceReducer = (state = { news: [] }, action) => {
  switch (action.type) {
    case NEWS_BY_SOURCE_REQUEST:
      return { loading: true, news: [] };
    case NEWS_BY_SOURCE_SUCCESS:
      return {
        loading: false,
        news: action.payload.data,
        total: action.payload.total,
      };
    case NEWS_BY_SOURCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const newsByBiasReducer = (state = { news: [] }, action) => {
  switch (action.type) {
    case NEWS_BY_BIAS_REQUEST:
      return { loading: true, news: [] };
    case NEWS_BY_BIAS_SUCCESS:
      return {
        loading: false,
        news: action.payload.data,
        total: action.payload.total,
      };
    case NEWS_BY_BIAS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const newsSearchReducer = (state = { news: [] }, action) => {
  switch (action.type) {
    case NEWS_SEARCH_REQUEST:
      return { loading: true, news: [] };
    case NEWS_SEARCH_SUCCESS:
      return {
        loading: false,
        news: action.payload.data,
        total: action.payload.total,
      };
    case NEWS_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    case NEWS_SEARCH_RESET:
      return { news: [] };
    default:
      return state;
  }
};

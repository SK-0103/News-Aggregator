import {
  SOURCE_LIST_REQUEST,
  SOURCE_LIST_SUCCESS,
  SOURCE_LIST_FAIL,
  SOURCE_DETAILS_REQUEST,
  SOURCE_DETAILS_SUCCESS,
  SOURCE_DETAILS_FAIL,
  SOURCE_BY_BIAS_REQUEST,
  SOURCE_BY_BIAS_SUCCESS,
  SOURCE_BY_BIAS_FAIL
} from '../constants/sourceConstants';

export const sourceListReducer = (state = { sources: [] }, action) => {
  switch (action.type) {
    case SOURCE_LIST_REQUEST:
      return { loading: true, sources: [] };
    case SOURCE_LIST_SUCCESS:
      return {
        loading: false,
        sources: action.payload.data,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case SOURCE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sourceDetailsReducer = (state = { source: {} }, action) => {
  switch (action.type) {
    case SOURCE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case SOURCE_DETAILS_SUCCESS:
      return { loading: false, source: action.payload };
    case SOURCE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sourceByBiasReducer = (state = { sources: [] }, action) => {
  switch (action.type) {
    case SOURCE_BY_BIAS_REQUEST:
      return { loading: true, sources: [] };
    case SOURCE_BY_BIAS_SUCCESS:
      return { loading: false, sources: action.payload };
    case SOURCE_BY_BIAS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

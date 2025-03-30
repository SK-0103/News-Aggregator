import axios from 'axios';
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

// Get all sources with pagination
export const listSources = (page = 1, limit = 10) => async (dispatch) => {
  try {
    dispatch({ type: SOURCE_LIST_REQUEST });

    const { data } = await axios.get(`/api/sources?page=${page}&limit=${limit}`);

    dispatch({
      type: SOURCE_LIST_SUCCESS,
      payload: {
        data: data.data,
        pages: Math.ceil(data.count / limit),
        page
      },
    });
  } catch (error) {
    dispatch({
      type: SOURCE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get source details by ID
export const getSourceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SOURCE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/sources/${id}`);

    dispatch({
      type: SOURCE_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: SOURCE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get sources by political bias
export const getSourcesByBias = (bias) => async (dispatch) => {
  try {
    dispatch({ type: SOURCE_BY_BIAS_REQUEST });

    const { data } = await axios.get(`/api/sources/bias/${bias}`);

    dispatch({
      type: SOURCE_BY_BIAS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: SOURCE_BY_BIAS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Import reducers
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';

import {
  newsListReducer,
  newsDetailsReducer,
  newsByCategoryReducer,
  newsBySourceReducer,
  newsByBiasReducer,
  newsSearchReducer,
} from './reducers/newsReducers';

import {
  sourceListReducer,
  sourceDetailsReducer,
  sourceByBiasReducer,
} from './reducers/sourceReducers';

// Combine reducers
const reducer = combineReducers({
  // User reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  
  // News reducers
  newsList: newsListReducer,
  newsDetails: newsDetailsReducer,
  newsByCategory: newsByCategoryReducer,
  newsBySource: newsBySourceReducer,
  newsByBias: newsByBiasReducer,
  newsSearch: newsSearchReducer,
  
  // Source reducers
  sourceList: sourceListReducer,
  sourceDetails: sourceDetailsReducer,
  sourceByBias: sourceByBiasReducer,
});

// Get user info from localStorage if available
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Initial state
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

// Middleware
const middleware = [thunk];

// Create store
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;

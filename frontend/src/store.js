import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { 
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer
} from './redux/reducers/userReducers';

import {
  newsListReducer,
  newsDetailsReducer,
  newsByCategoryReducer,
  newsBySourceReducer,
  newsByBiasReducer,
  newsSearchReducer
} from './redux/reducers/newsReducers';

import {
  sourceListReducer,
  sourceDetailsReducer,
  sourceByBiasReducer
} from './redux/reducers/sourceReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  newsList: newsListReducer,
  newsDetails: newsDetailsReducer,
  newsByCategory: newsByCategoryReducer,
  newsBySource: newsBySourceReducer,
  newsByBias: newsByBiasReducer,
  newsSearch: newsSearchReducer,
  sourceList: sourceListReducer,
  sourceDetails: sourceDetailsReducer,
  sourceByBias: sourceByBiasReducer
});

// Get user info from localStorage if available
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

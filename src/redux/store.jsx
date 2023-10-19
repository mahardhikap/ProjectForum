import { legacy_createStore, applyMiddleware } from '@reduxjs/toolkit';
import rootReducers from './reducers'
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const store = legacy_createStore(
  rootReducers,
  applyMiddleware(thunk, logger),
);

export default store;
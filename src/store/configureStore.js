import { createStore, applyMiddleware, compose } from 'redux';
import penderMiddleware from 'redux-pender';

import modules from './modules';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = initialState => {
  const store = createStore(
    modules,
    initialState,
    composeEnhancers(applyMiddleware(penderMiddleware()))
  );
  return store;
};

export default configureStore;

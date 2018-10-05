import React from 'react';
import App from 'components/App';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';

const store = configureStore();

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;

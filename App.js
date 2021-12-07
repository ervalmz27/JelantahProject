import React from 'react';
import {Provider} from 'react-redux';
import AppNavContainer from './src/routes';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import reducers from './src/Apis/reducers';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
axios.defaults.baseURL = 'https://reqres.in/api';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavContainer />
    </Provider>
  );
};

export default App;

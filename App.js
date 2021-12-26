import React from 'react';
import {Provider} from 'react-redux';
import AppNavContainer from './src/routes';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import {ModalPortal} from 'react-native-modals';
import reducers from './src/Apis/reducers';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

const App = () => {
  return (
    <Provider store={store}>
      <AppNavContainer />
      <ModalPortal />
    </Provider>
  );
};

export default App;

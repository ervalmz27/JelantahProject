import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import AppNavContainer from './src/routes';
import {store} from './src/Apis';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <AppNavContainer />
    </Provider>
  );
};

export default App;

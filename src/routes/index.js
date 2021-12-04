import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './Auth';

const AppNavContainer = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default AppNavContainer;

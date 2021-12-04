import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigator from '../Home';
import Auth from '../../Pages/Auth';
import Splash from '../../Pages/Splash';

const AuthNavigator = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={'Splash'} component={Splash} />
      <AuthStack.Screen name={'indexAuth'} component={Auth} />
      <AuthStack.Screen name={'Dashboard'} component={HomeNavigator} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;

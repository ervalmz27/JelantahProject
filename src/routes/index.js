import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './Auth';
import HomeNavigator from './Home';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../Pages/Splash';
const AppNavContainer = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Splash'} component={Splash} />
        <Stack.Screen name={'Home'} component={HomeNavigator} />
        <Stack.Screen name={'Auth'} component={AuthNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavContainer;

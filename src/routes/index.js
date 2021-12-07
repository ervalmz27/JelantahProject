import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './Auth';
import HomeNavigator from './Home';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../Pages/Splash';
const AppNavContainer = () => {
  const jsonValue = AsyncStorage.getItem('token');
  console.log('sssss', jsonValue);

  const globalState = useSelector(state => state);
  console.log('username Terrr : ', globalState);

  return (
    <NavigationContainer>
      {/* <Slash.Screen name={'Splash'} component={Splash} /> */}
      {jsonValue != null ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavContainer;

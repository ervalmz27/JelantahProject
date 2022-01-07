import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Statistik from '../../../Pages/Dashboard/statistik';

const StatistikNavigator = () => {
  const Statis = createStackNavigator();

  return (
    <Statis.Navigator screenOptions={{headerShown: false}}>
      <Statis.Screen name={'dasboardStatis'} component={Statistik} />
    </Statis.Navigator>
  );
};

export default StatistikNavigator;

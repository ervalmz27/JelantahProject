import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Ewalet from '../../../Pages/User/E-Walet';
import TambahEwalet from '../../../Pages/User/E-Walet/TambahEwalet';

const EwaletNavigator = () => {
  const walet = createStackNavigator();

  return (
    <walet.Navigator screenOptions={{headerShown: false}}>
      <walet.Screen name={'E-walet'} component={Ewalet} />
      <walet.Screen name={'Tambahwalet'} component={TambahEwalet} />
    </walet.Navigator>
  );
};

export default EwaletNavigator;

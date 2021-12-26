import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import InfoPribadi from '../../Pages/User/informasiPribadi';
const AkunNavigator = () => {
  const Akun = createStackNavigator();

  return (
    <Akun.Navigator screenOptions={{headerShown: false}}>
      <Akun.Screen name={'info'} component={InfoPribadi} />
    </Akun.Navigator>
  );
};

export default AkunNavigator;
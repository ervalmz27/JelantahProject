import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Rekening from '../../../Pages/User/Rekening';
import TambahRekening from '../../../Pages/User/Rekening/TambahRekening';

const RekeningNavigator = () => {
  const rekening = createStackNavigator();

  return (
    <rekening.Navigator screenOptions={{headerShown: false}}>
      <rekening.Screen name={'myrekening'} component={Rekening} />
      <rekening.Screen name={'TambahRekening'} component={TambahRekening} />
    </rekening.Navigator>
  );
};

export default RekeningNavigator;

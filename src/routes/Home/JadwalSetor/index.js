import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import JadwalSetor from '../../../Pages/Dashboard/JadwalSetor/JadwalSetor';
import DetailSetor from '../../../Pages/Dashboard/JadwalSetor/detailJSetor';
import KodeQRJadwalSetoran from '../../../Pages/Dashboard/JadwalSetor/KodeQRJadwalSetoran';
const JadwalSetorNavigator = () => {
  const Setor = createStackNavigator();

  return (
    <Setor.Navigator screenOptions={{headerShown: false}}>
      <Setor.Screen name={'dashbordJadwalSetor'} component={JadwalSetor} />
      <Setor.Screen name={'detailsetor'} component={DetailSetor} />
      <Setor.Screen name={'kodesetor'} component={KodeQRJadwalSetoran} />
    </Setor.Navigator>
  );
};

export default JadwalSetorNavigator;

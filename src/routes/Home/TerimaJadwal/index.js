import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import TerimaJadwal from '../../../Pages/Dashboard/TerimaJadwal';
import DetailJadwal from '../../../Pages/Dashboard/TerimaJadwal/DetailJadwal';
import TolakJadwal from '../../../Pages/Dashboard/TerimaJadwal/TolakJadwal';
import JadwalTerima from '../../../Pages/Dashboard/TerimaJadwal/JadwalTerima';
import Accept from '../../../Pages/Dashboard/TerimaJadwal/Accept';
import Rejected from '../../../Pages/Dashboard/TerimaJadwal/Rejected';
const TerimaJadwalNavigator = () => {
  const Terima = createStackNavigator();

  return (
    <Terima.Navigator screenOptions={{headerShown: false}}>
      <Terima.Screen name={'dashbordTerimajadwal'} component={TerimaJadwal} />
      <Terima.Screen name={'detailJadwal'} component={DetailJadwal} />
      <Terima.Screen name={'acceptJadwal'} component={Accept} />
      <Terima.Screen name={'rejectJadwal'} component={Rejected} />
      <Terima.Screen name={'tolakjadwal'} component={TolakJadwal} />
      <Terima.Screen name={'jadwalterima'} component={JadwalTerima} />
    </Terima.Navigator>
  );
};

export default TerimaJadwalNavigator;

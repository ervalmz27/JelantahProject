import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import QrCode from '../../Pages/QRCode';
import InpurManual from '../../Pages/QRCode/InputManual';
import HitungManual from '../../Pages/QRCode/InputManual/HitungManual';
import TerimaJadwal from '../../Pages/QRCode/InputManual/TerimaJadwal';
const ScannerNavigator = () => {
  const Scaner = createStackNavigator();

  return (
    <Scaner.Navigator screenOptions={{headerShown: false}}>
      <Scaner.Screen name={'dashbordscaer'} component={QrCode} />
      <Scaner.Screen name={'inputmanual'} component={InpurManual} />
      <Scaner.Screen name={'hitungmanual'} component={HitungManual} />
      <Scaner.Screen name={'terimajadwal'} component={TerimaJadwal} />
      {/* InpurManual */}
    </Scaner.Navigator>
  );
};

export default ScannerNavigator;

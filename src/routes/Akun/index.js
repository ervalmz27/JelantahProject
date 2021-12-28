import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import InfoPribadi from '../../Pages/User/informasiPribadi';

import ChangeNomorPonsel from '../../Pages/User/informasiPribadi/ChangeNomorPonsel';
import VerificationHP from '../../Pages/User/informasiPribadi/VerificationHp';
import KelolaNoomorHP from '../../Pages/User/informasiPribadi/KelolaNoomorHP';
const AkunNavigator = () => {
  const Akun = createStackNavigator();

  return (
    <Akun.Navigator screenOptions={{headerShown: false}}>
      <Akun.Screen name={'info'} component={InfoPribadi} />
      <Akun.Screen name={'cahngeHp'} component={ChangeNomorPonsel} />
      <Akun.Screen name={'VerifHp'} component={VerificationHP} />
      <Akun.Screen name={'KelolaHp'} component={KelolaNoomorHP} />
    </Akun.Navigator>
  );
};

export default AkunNavigator;

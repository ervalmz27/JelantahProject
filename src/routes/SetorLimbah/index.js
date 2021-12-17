import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SetorLimbah from '../../Pages/Dashboard/SetorLimbah';
import Cheklist from '../../Pages/Dashboard/SetorLimbah/component';
const SetorLimbahNavigator = () => {
  const Setor = createStackNavigator();

  return (
    <Setor.Navigator screenOptions={{headerShown: false}}>
      <Setor.Screen name={'dashbordSetor'} component={SetorLimbah} />
      <Setor.Screen name={'berhasil'} component={Cheklist} />
    </Setor.Navigator>
  );
};

export default SetorLimbahNavigator;

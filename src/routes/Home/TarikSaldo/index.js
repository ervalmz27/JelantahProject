import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TarikSaldo from '../../../Pages/Dashboard/TarikSaldo';
import Transfer from '../../../Pages/Dashboard/TarikSaldo/Transfer';
const TarikSaldoNavigator = () => {
  const Tarik = createStackNavigator();

  return (
    <Tarik.Navigator screenOptions={{headerShown: false}}>
      <Tarik.Screen name={'dasboardTarik'} component={TarikSaldo} />
      <Tarik.Screen name={'transfer'} component={Transfer} />
    </Tarik.Navigator>
  );
};

export default TarikSaldoNavigator;

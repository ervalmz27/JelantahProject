import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChangePassword from '../../../Pages/User/ChangePassword';
import GantiPassword from '../../../Pages/User/ChangePassword/changePassword';

const ChangeNavigator = () => {
  const change = createStackNavigator();

  return (
    <change.Navigator screenOptions={{headerShown: false}}>
      <change.Screen name={'gantiPassword'} component={ChangePassword} />
      <change.Screen name={'ubahkatasandi'} component={GantiPassword} />
    </change.Navigator>
  );
};

export default ChangeNavigator;

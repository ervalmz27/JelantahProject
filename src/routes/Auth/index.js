import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Auth from '../../Pages/Auth';

import Login from '../../Pages/Auth/Login';
import Register from '../../Pages/Auth/register';
import RegisterMitraUsaha from '../../Pages/Auth/register/mitrausaha';
import LupaPassword from '../../Pages/Auth/LupaPasword';
import SendOTP from '../../Pages/Auth/LupaPasword/SendOTP';
import UbahPassword from '../../Pages/Auth/LupaPasword/UbahPassword';
import MitraLembaga from '../../Pages/Auth/register/mitralembaga';
const AuthNavigator = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={'indexAuth'} component={Auth} />
      <AuthStack.Screen name={'Loginscreen'} component={Login} />
      <AuthStack.Screen name={'Registerscreen'} component={Register} />
      <AuthStack.Screen name={'MitraUsaha'} component={RegisterMitraUsaha} />
      <AuthStack.Screen name={'LupaPassword'} component={LupaPassword} />
      <AuthStack.Screen name={'sendotp'} component={SendOTP} />
      <AuthStack.Screen name={'ubahPassword'} component={UbahPassword} />
      <AuthStack.Screen name={'MitraLembaga'} component={MitraLembaga} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;

import React from 'react';
import Notificat from '../../../Pages/Dashboard/notifikasi';
import {createStackNavigator} from '@react-navigation/stack';
import Detail from '../../../Pages/Dashboard/notifikasi/Detail';
import NotifQr from '../../../Pages/Dashboard/notifikasi/NotifQr';
const NotifikasiNavigator = () => {
  const Notif = createStackNavigator();

  return (
    <Notif.Navigator screenOptions={{headerShown: false}}>
      <Notif.Screen name={'dashbordNotif'} component={Notificat} />
      <Notif.Screen name={'detailNotif'} component={Detail} />
      <Notif.Screen name={'Notifqr'} component={NotifQr} />
    </Notif.Navigator>
  );
};

export default NotifikasiNavigator;

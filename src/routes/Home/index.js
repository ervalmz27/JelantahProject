import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Dashboar from '../../Pages/Dashboard';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SetorLimbahNavigator from '../SetorLimbah';
import NotifikasiNavigator from './notifikation';
import User from '../../Pages/User';
import QrCode from '../../Pages/QRCode';
import ScannerNavigator from '../ScannerQr';

const HomeNavigator = ({navigation}) => {
  const HomeStack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
      onPress={onPress}
      style={{top: -20, justifyContent: 'center', alignItems: 'center'}}>
      <LinearGradient
        colors={['#51C091', '#1B7FDC']}
        // start={{x: 0, y: 0}}
        // end={{x: 1.2, y: 1}}
        style={{borderRadius: 100}}>
        <View style={{width: 70, height: 70, borderRadius: 35}}>
          {children}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <HomeStack.Navigator
      initialRouteName={'HomeDasboar'}
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name={'HomeScreen'}>
        {() => (
          <Tab.Navigator
            tabBarOptions={{
              tabBarHideOnKeyboard: true,
              showLabel: false,
            }}
            initialRouteName={'Dashboard'}
            screenOptions={{headerShown: false}}>
            <Tab.Screen
              options={{
                tabBarStyle: {
                  position: 'relative',
                  backgroundColor: '#51C091',
                  height: 60,
                },
                tabBarIcon: ({focused}) => (
                  <View style={{alignItems: 'center'}}>
                    <Icon
                      name="home"
                      solid={true}
                      size={24}
                      color={focused ? '#fff' : '#FFFFFF80'}
                    />
                    <Text
                      style={{
                        color: focused ? '#fff' : '#FFFFFF80',
                        fontFamily: 'Poppins-Reguler',
                        fontWeight: '500',
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      Beranda
                    </Text>
                  </View>
                ),
              }}
              name={'Dashboar'}
              component={Dashboar}
            />
            <Tab.Screen
              options={{
                tabBarStyle: {
                  position: 'relative',
                  backgroundColor: '#51C091',
                  height: 60,
                },

                tabBarIcon: ({focused}) => (
                  <View style={{alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/Images/home/piala.png')}
                      style={{tintColor: focused ? '#fff' : '#FFFFFF80'}}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        color: focused ? '#fff' : '#FFFFFF80',
                        fontFamily: 'Poppins-Reguler',
                        fontWeight: '500',
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      Tugas
                    </Text>
                  </View>
                ),
              }}
              name={'tugas'}
              component={User}
            />
            <Tab.Screen
              options={{
                tabBarStyle: {
                  position: 'relative',
                  backgroundColor: '#51C091',
                  height: 60,
                },

                tabBarIcon: ({focused}) => (
                  <View style={{borderRadius: 100}}>
                    <View>
                      <Image
                        source={require('../../assets/Images/home/scan.png')}
                        resizeMode="contain"
                        style={{tintColor: focused ? '#fff' : '#FFFFFF80'}}
                      />
                    </View>
                  </View>
                ),
                tabBarButton: props => (
                  <CustomTabBarButton
                    {...props}
                    onPress={() => navigation.navigate('codeQr')}
                  />
                ),
              }}
              name={'qrscan'}
              component={QrCode}
            />
            <Tab.Screen
              options={{
                tabBarStyle: {
                  position: 'relative',
                  backgroundColor: '#51C091',
                  height: 60,
                },

                tabBarIcon: ({focused}) => (
                  <View style={{alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/Images/home/riwayat.png')}
                      resizeMode="contain"
                      style={{
                        tintColor: focused ? '#fff' : '#FFFFFF80',
                        height: 20,
                      }}
                    />
                    <Text
                      style={{
                        color: focused ? '#fff' : '#FFFFFF80',
                        fontFamily: 'Poppins-Reguler',
                        fontWeight: '500',
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      Riwayat
                    </Text>
                  </View>
                ),
              }}
              name={'riwayat'}
              component={User}
            />
            <Tab.Screen
              options={{
                tabBarStyle: {
                  position: 'relative',
                  backgroundColor: '#51C091',
                  height: 60,
                },

                tabBarIcon: ({focused}) => (
                  <View style={{alignItems: 'center'}}>
                    <Icon
                      name="user-alt"
                      solid={true}
                      size={24}
                      color={focused ? '#fff' : '#FFFFFF80'}
                    />
                    <Text
                      style={{
                        color: focused ? '#fff' : '#FFFFFF80',
                        fontFamily: 'Poppins-Reguler',
                        fontWeight: '500',
                        fontSize: 12,
                        marginTop: 3,
                      }}>
                      Saya
                    </Text>
                  </View>
                ),
              }}
              name={'User'}
              component={User}
            />
          </Tab.Navigator>
        )}
      </HomeStack.Screen>
      <Tab.Screen name={'Setor'} component={SetorLimbahNavigator} />
      <Tab.Screen name={'notification'} component={NotifikasiNavigator} />
      <Tab.Screen name={'codeQr'} component={ScannerNavigator} />
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;

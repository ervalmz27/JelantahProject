import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Dashboar from '../../Pages/Dashboard';
import {Dimensions} from 'react-native';
import Thsirt from '../../Pages/Tshirt';
import User from '../../Pages/User';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const HomeNavigator = () => {
  const HomeStack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <HomeStack.Navigator
      initialRouteName={'HomeDasboar'}
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name={'Home'}>
        {() => (
          <Tab.Navigator
            tabBarOptions={{
              activeTintColor: '#43C17A',
              tabBarHideOnKeyboard: true,
            }}
            initialRouteName={'Dashboard'}
            screenOptions={{headerShown: false}}>
            <Tab.Screen
              options={{
                tabBarStyle: {
                  position: 'relative',
                  backgroundColor: '#22668A',
                  marginBottom: 24,
                  marginHorizontal: 20,
                  borderRadius: 7,
                  height: 59,
                  marginTop: 10,
                },
                headerShown: false,
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => (
                  <Icon name="home" solid={true} size={24} color="#fff" />
                ),
              }}
              name={'Dashboar'}
              component={Dashboar}
            />
            <Tab.Screen
              options={{
                tabBarStyle: {
                  position: 'relative',
                  backgroundColor: '#22668A',
                  marginBottom: 24,
                  marginTop: 10,
                  marginHorizontal: 20,
                  borderRadius: 7,
                  height: 59,
                },
                headerShown: false,
                tabBarLabel: 'T-Shirt',
                tabBarIcon: ({color, size}) => (
                  <Icon name="tshirt" solid={true} size={24} color="#fff" />
                ),
              }}
              name={'Baju'}
              component={Thsirt}
            />
            <Tab.Screen
              options={{
                tabBarStyle: {
                  position: 'relative',
                  backgroundColor: '#22668A',
                  marginBottom: 24,
                  marginTop: 10,
                  marginHorizontal: 20,
                  borderRadius: 7,
                  height: 59,
                },
                headerShown: false,
                tabBarLabel: 'Profile',
                tabBarIcon: ({color, size}) => (
                  <Icon name="user-alt" solid={true} size={24} color="#fff" />
                ),
              }}
              name={'User'}
              component={User}
            />
            {/* user-alt */}
          </Tab.Navigator>
        )}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
};
export default HomeNavigator;

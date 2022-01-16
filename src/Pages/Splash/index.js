import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground, StatusBar, Dimensions } from 'react-native';
import { SplashBackground } from '../../assets';
import AuthNavigator from '../../routes/Auth';
import HomeNavigator from '../../routes/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Splash = ({ navigation }) => {
  // console.log('sssss', jsonValue);
  useEffect(() => {
    setTimeout(async () => {
      const jsonValue = await AsyncStorage.getItem('token');
      if (jsonValue) {
        navigation.replace('Home');
      } else {
        navigation.replace('Auth');
      }
    }, 3000);
  }, [navigation]);
  return (
    <>
      <StatusBar animated={true} backgroundColor="#51C091" />
      <ImageBackground
        source={SplashBackground}
        style={styles.background}></ImageBackground>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  background: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    height: windowHeight * 1,
    width: windowWidth * 1,
  },
});

import React, {useEffect} from 'react';
import {StyleSheet, ImageBackground, Dimensions} from 'react-native';
import {SplashBackground} from '../../assets';
import AuthNavigator from '../../routes/Auth';
import HomeNavigator from '../../routes/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Splash = ({navigation}) => {
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
    <ImageBackground
      source={SplashBackground}
      style={styles.background}></ImageBackground>
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

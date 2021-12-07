import React, {useEffect} from 'react';
import {StyleSheet, ImageBackground, Dimensions} from 'react-native';
import {SplashBackground} from '../../assets';
import HomeNavigator from '../../routes/Home';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace(HomeNavigator);
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

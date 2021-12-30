import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Dompet = ({navigation}) => {
  return (
    <>
      <ImageBackground
        source={require('../../../assets/Images/bghomge.jpg')}
        style={styles.background}>
        <View style={styles.rowContent}>
          <View
            style={{
              flex: 1,
              marginLeft: -30,
              marginTop: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: '#fff',
                fontSize: 14,
                letterSpacing: 0.5,
              }}>
              Sisa Saldo
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: '#fff',
                fontSize: 14,
                letterSpacing: 0.5,
              }}>
              Rp.200.000
            </Text>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default Dompet;

const styles = StyleSheet.create({
  background: {
    // backgroundColor: '#51C091',
    height: windowHeight * 0.3,
    alignItems: 'center',
    // flex: 1,
    justifyContent: 'center',
  },
  rowContent: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -30,
    // width: windowWidth * 0.87,
    marginHorizontal: windowWidth * 0.2,
  },
});

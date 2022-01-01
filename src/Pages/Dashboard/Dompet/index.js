import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Coin from '../../../assets/Images/Icon/Coin.svg';
import BankCard from '../../../assets/Images/Icon/bank-cards.svg';
import TarikSaldo from '../../../assets/Images/Icon/TarikSaldo.svg';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Dompet = ({navigation}) => {
  return (
    <>
      <ImageBackground
        source={require('../../../assets/Images/bghomge.jpg')}
        style={styles.background}>
        <TouchableOpacity
          style={{
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            name="chevron-left"
            color="#fff"
            style={{marginRight: 15}}
            size={20}
          />
          <Text style={styles.header}>Dompet</Text>
        </TouchableOpacity>
        <View style={styles.rowContent}>
          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: windowWidth * 1,
              }}>
              <Text style={styles.text}>Sisa Saldo</Text>
              <View style={styles.content}>
                <Coin height={16} width={16} />
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Poppins-Regular',
                    marginLeft: 10,
                  }}>
                  20 Poin
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: '#fff',
                fontSize: 24,
                letterSpacing: 0.5,
                marginTop: -10,
              }}>
              Rp.200.000
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.containerConten}>
        <View style={styles.cardContent}>
          <TouchableOpacity style={{alignItems: 'center', width: 68}}>
            <TarikSaldo height={32} width={32} />
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                marginTop: 5,
              }}>
              Tarik Saldo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center', width: 68}}>
            <Image
              // source={require('../../assets/Images/home/riwayat.png')}
              source={require('../../../assets/Images/home/riwayat.png')}
              resizeMode="contain"
              style={{
                tintColor: '#51C091',
                width: 30,
                height: 50,
              }}
            />
            <Text style={{textAlign: 'center'}}>Riwayat</Text>
          </TouchableOpacity>
        </View>
        <View style={{padding: 20}}>
          <Text style={styles.title}>Aktifitas Terakhir</Text>
        </View>
      </View>
    </>
  );
};

export default Dompet;

const styles = StyleSheet.create({
  background: {
    // backgroundColor: '#51C091',
    zIndex: -1,
    height: windowHeight * 0.3,
  },
  containerConten: {
    backgroundColor: '#fff',
    zIndex: -1,
    borderTopLeftRadius: 20,
    marginTop: -25,
    borderTopRightRadius: 20,
    height: windowHeight * 1,
  },
  cardContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 10,
    marginTop: -30,
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    backgroundColor: '#EBEBEB',
    opacity: 0.7,
    marginRight: 20,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 37,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  rowContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    letterSpacing: 0.5,
    color: '#263238',
  },
});

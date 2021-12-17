import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Coin from '../../../assets/Images/Icon/Coin.svg';
import Header from '../../component/Header';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Cheklist = ({navigation}) => {
  return (
    <>
      <Header
        icon="chevron-left"
        name="Detail Notifikasi"
        onClick={() => {
          navigation.goBack();
        }}
      />

      <View
        style={[
          {flex: 1, alignItems: 'center', justifyContent: 'center'},
          {marginTop: -100},
        ]}>
        <Text
          style={{
            color: '#6FCF97',
            fontFamily: 'Poppins-Reguler',
            fontSize: 32,
            lineHeight: 48,
            backgroundColor: '#51C0911A',
            width: '100%',
            textAlign: 'center',
          }}>
          + Rp50.000
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Coin height={20} width={20} />
          <Text
            style={{
              color: '#FFC727',
              fontFamily: 'Poppins-Reguler',
              fontSize: 24,
              lineHeight: 36,
            }}>
            50 Poin
          </Text>
        </View>
      </View>
      <View style={[styles.container, {marginTop: -280, marginBottom: 20}]}>
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <View>
            <Text
              style={[
                styles.header,
                {marginBottom: 16, fontFamily: 'Poppins-SemiBold'},
              ]}>
              Wow, Saldo Kamu Bertambah
            </Text>
            <Text style={[styles.text, {marginHorizontal: 20}]}>
              Kamu baru saja mendapatkan saldo dan poin tambahan karena telah
              berhasil menyetor limbah hari ini
            </Text>
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
      <View style={{margin: 10}}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}>
          <Text
            style={{color: '#fff', fontSize: 14, fontFamily: 'Poppins-Bold'}}>
            Cek Saldo
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Cheklist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#51C091',
    fontFamily: 'Poppins-Reguler',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Poppins-Reguler',
    fontWeight: '400',
    fontSize: 14,
  },
  Button: {
    height: 48,
    backgroundColor: '#51C091',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../component/Header';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const JadwalTerima = ({navigation}) => {
  return (
    <>
      <Header
        name="Hitung Manual"
        icon="chevron-left"
        onClick={() => navigation.goBack()}
      />
      <View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <View style={{margin: 100}}>
            <Icon name="check-circle" size={100} solid color="#51C091" />
          </View>
          <View style={{marginHorizontal: 10, marginTop: -25}}>
            <Text style={styles.header}>Jadwal Berhasil Kamu Setujui</Text>
            <Text style={styles.text}>
              Jadwal setor mitra warga kamu, sudah berhasil kamu setujui
            </Text>
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
      <View style={{position: 'absolute', bottom: 10, width: windowWidth * 1}}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}>
          <Text
            style={{color: '#fff', fontSize: 14, fontFamily: 'Poppins-Bold'}}>
            Kembali
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default JadwalTerima;

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
    marginTop: 10,
    width: windowWidth * 0.7,
    color: '#26323880',
  },
  Button: {
    height: 48,
    backgroundColor: '#51C091',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
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

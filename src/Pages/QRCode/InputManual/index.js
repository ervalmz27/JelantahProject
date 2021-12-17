import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../../component/Header';
import Prime from '../../../assets/Images/Icon/prime_qrcode.svg';
const InpurManual = ({navigation}) => {
  return (
    <>
      <Header
        name="Input Manual Kode QR"
        icon="chevron-left"
        onClick={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Text style={styles.header}>Cek kelengkapan setoran</Text>
        <Text
          style={[
            styles.header,
            {fontSize: 12, fontFamily: 'Poppins-Reguler', color: '#26323880'},
          ]}>
          Harap periksa dengan teliti isi setoran ini. Jika jumlah tidak sesuai,
          silakan hitung manual
        </Text>
        <View
          style={[
            styles.containerInput,
            {marginTop: 10, flexDirection: 'row'},
          ]}>
          <View style={{marginTop: 15}}>
            <Prime height={20} width={20} />
          </View>
          <TextInput
            placeholder="ID Code (JLNBUDI270820211200)"
            style={styles.input}
            // value={}
            // onChangeText={event => {}}
          />
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          {position: 'absolute', bottom: 10, width: '89%'},
        ]}
        onPress={() => {
          navigation.navigate('hitungmanual');
        }}>
        <Text style={[styles.fontReguler, {color: '#fff'}]}>Lanjutkan</Text>
      </TouchableOpacity>
    </>
  );
};

export default InpurManual;

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#263238',
  },
  container: {
    padding: 15,
  },
  input: {
    fontFamily: 'Poppins-Reguler',
    color: '#010101',
    padding: 10,
    marginLeft: 5,
  },
  containerInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#51C091',
  },
  button: {
    backgroundColor: '#51C091',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 20,
  },
  fontReguler: {
    fontFamily: 'Poppins-Regular',
  },
});

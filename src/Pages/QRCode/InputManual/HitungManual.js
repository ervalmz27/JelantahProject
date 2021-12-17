import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../component/Header';
import User from '../../../assets/Images/Icon/User.svg';
import Clarity from '../../../assets/Images/Icon/clarity_house-line.svg';
import House from '../../../assets/Images/Icon/House.svg';
import Recovery from '../../../assets/Images/Icon/Recovery.svg';
import Tanggal from '../../../assets/Images/Icon/Tanggal.svg';
import Jam from '../../../assets/Images/Icon/Jam.svg';
import Timbangan from '../../../assets/Images/Icon/Timbangan.svg';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const HitungManual = ({navigation}) => {
  return (
    <>
      <Header
        name="Hitung Manual"
        icon="chevron-left"
        onClick={() => navigation.goBack()}
      />
      {/* style={{height: windowHeight * 1}} */}
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>Hitung manual limbahnya</Text>
          <Text
            style={[
              styles.header,
              {fontSize: 12, fontFamily: 'Poppins-Reguler', color: '#26323880'},
            ]}>
            Harap menghitung jumlah limbah dengan benar dan menggunakan
            timbangan yang sudah disarankan. Data yang dapat diubah hanya berat
            limbah saja
          </Text>
          {/* User Name */}
          <View style={{marginTop: 15}}>
            <Text
              style={[
                styles.header,
                {
                  fontSize: 12,
                  fontFamily: 'Poppins-Reguler',
                  color: '#26323880',
                },
              ]}>
              Nama Penyetor
            </Text>
          </View>
          <View style={[styles.containerInput, {flexDirection: 'row'}]}>
            <View style={{marginTop: 15}}>
              <User height={20} width={20} />
            </View>
            <TextInput
              placeholder=" Nama Penyetor"
              style={styles.input}
              multiline={true}
              // value={}
              // onChangeText={event => {}}
            />
          </View>
          {/* End Userr */}
          {/* Alamat */}
          <View style={{marginTop: 15}}>
            <Text
              style={[
                styles.header,
                {
                  fontSize: 12,
                  fontFamily: 'Poppins-Reguler',
                  color: '#26323880',
                },
              ]}>
              Alamat Penyetor
            </Text>
          </View>
          <View style={[styles.containerInput, {flexDirection: 'row'}]}>
            <View style={{marginTop: 15}}>
              <Clarity height={20} width={20} />
            </View>
            <TextInput
              placeholder="Alamat Penyetor"
              style={styles.input}
              multiline={true}
              // value={}
              // onChangeText={event => {}}
            />
          </View>
          {/* end Alamat */}
          {/* Setor Limbah */}
          <View style={{marginTop: 15}}>
            <Text
              style={[
                styles.header,
                {
                  fontSize: 12,
                  fontFamily: 'Poppins-Reguler',
                  color: '#26323880',
                },
              ]}>
              Setor ke Mitra
            </Text>
          </View>
          <View style={[styles.containerInput, {flexDirection: 'row'}]}>
            <View style={{marginTop: 15}}>
              <House height={20} width={20} />
            </View>
            <TextInput
              placeholder="Setor ke Mitra"
              style={styles.input}
              multiline={true}
              // value={}
              // onChangeText={event => {}}
            />
          </View>
          {/*end  Setor Limbah */}
          {/* Jenis Limbah */}
          <View style={{marginTop: 15}}>
            <Text
              style={[
                styles.header,
                {
                  fontSize: 12,
                  fontFamily: 'Poppins-Reguler',
                  color: '#26323880',
                },
              ]}>
              Jenis Limbah
            </Text>
          </View>
          <View style={[styles.containerInput, {flexDirection: 'row'}]}>
            <View style={{marginTop: 15}}>
              <Recovery height={20} width={20} />
            </View>
            <TextInput
              placeholder="Jenis Limbah"
              style={styles.input}
              multiline={true}
              // value={}
              // onChangeText={event => {}}
            />
          </View>
          {/* End Limbah */}
          <View style={{marginTop: 15}}>
            <Text
              style={[
                styles.header,
                {
                  fontSize: 12,
                  fontFamily: 'Poppins-Reguler',
                  color: '#26323880',
                },
              ]}>
              Tanggal Jadwal Setor
            </Text>
          </View>
          <View style={[styles.containerInput, {flexDirection: 'row'}]}>
            <View style={{marginTop: 15}}>
              <Tanggal height={20} width={20} />
            </View>
            <TextInput
              placeholder="Tanggal Jadwal Setor"
              style={styles.input}
              multiline={true}
              // value={}
              // onChangeText={event => {}}
            />
          </View>
          {/* End Tanngal */}
          {/* Jam  */}
          <View style={{marginTop: 15}}>
            <Text
              style={[
                styles.header,
                {
                  fontSize: 12,
                  fontFamily: 'Poppins-Reguler',
                  color: '#26323880',
                },
              ]}>
              Waktu Jadwal Setor
            </Text>
          </View>
          <View style={[styles.containerInput, {flexDirection: 'row'}]}>
            <View style={{marginTop: 15}}>
              <Jam height={20} width={20} />
            </View>
            <TextInput
              placeholder=" Waktu Jadwal Setor"
              style={styles.input}
              multiline={true}
              // value={}
              // onChangeText={event => {}}
            />
          </View>
          {/* End Waktu */}
          {/* Timbangan */}
          <View style={{marginTop: 15}}>
            <Text
              style={[
                styles.header,
                {
                  fontSize: 12,
                  fontFamily: 'Poppins-Reguler',
                  color: '#26323880',
                },
              ]}>
              Berat Limbah
            </Text>
          </View>
          <View style={[styles.containerInput, {flexDirection: 'row'}]}>
            <View style={{marginTop: 15}}>
              <Timbangan height={20} width={20} />
            </View>
            <TextInput
              placeholder="Berat Limbah"
              style={styles.input}
              multiline={true}
              // value={}
              // onChangeText={event => {}}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('terimajadwal');
        }}>
        <Text style={[styles.fontReguler, {color: '#fff'}]}>
          Terima Setoran
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default HitungManual;

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
    fontFamily: 'Poppins-Regular',
    width: windowWidth * 0.8,
    color: '#010101',
    padding: 10,
    marginLeft: 5,
    tintColor: '#aeaeae',
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
  button: {
    backgroundColor: '#51C091',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 20,
  },
});

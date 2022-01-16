import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import Header from '../../component/Header';
import Recovery from '../../../assets/Images/Icon/Recovery.svg';
import Tanggal from '../../../assets/Images/Icon/Tanggal.svg';
import Jam from '../../../assets/Images/Icon/Jam.svg';
import Timbangan from '../../../assets/Images/Icon/Timbangan.svg';
import {useSelector} from 'react-redux';
import moment from 'moment';
import Tanda from '../../../assets/Images/Icon/Tanda.svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Accept = ({navigation, route}) => {
  const {detail} = route.params;
  console.log('detail------>', detail);
  return (
    <>
      <Header
        name="Jadwal Diterima"
        icon="chevron-left"
        onClick={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.notif}>
            <Tanda height={20} width={20} />
            <Text style={styles.text}>Jadwal Telah Diterima</Text>
          </View>
        </View>

        <View style={{marginHorizontal: 20}}>
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
              placeholder="Limbah Minyak Jelantah"
              style={styles.input}
              multiline={true}
              editable={false}
              value={detail.jenis_limbah}
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
              placeholder="Senin, 02 November 2021"
              style={styles.input}
              multiline={true}
              editable={false}
              value={moment(detail.created_date).format('DD/MM/YYYY')}
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
              placeholder=" 13:00"
              style={styles.input}
              multiline={true}
              editable={false}
              value={moment(detail.created_date).format('HH:mm:ss')}
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
              editable={false}
              value={detail.qty}
              // onChangeText={event => {}}
            />
            <Text style={styles.gram}>gram</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Accept;

const styles = StyleSheet.create({
  content: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  notif: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  gram: {
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    fontSize: 14,
    color: '#51C091',
  },
  containerInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#51C091',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 5,
    color: '#26323880',
  },
  input: {
    fontFamily: 'Poppins-Regular',
    width: windowWidth * 0.7,
    color: '#010101',
    padding: 10,
    marginLeft: 5,
    tintColor: '#aeaeae',
  },
  img: {
    borderRadius: 100,
    height: 40,
    width: 40,
  },
  nameProfile: {
    fontFamily: 'Poppins-Regular',
    color: '#263238',
    fontSize: 14,
    fontWeight: '600',
  },
  message: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  catatan: {
    marginTop: 15,
  },
  catatanInput: {
    width: windowWidth * 0.87,
    backgroundColor: '#EBEBEB80',
    borderRadius: 5,
    height: windowHeight * 0.25,
    textAlignVertical: 'top',
    padding: 10,
  },
  outlineButton: {
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FB876E',
    padding: 10,
    width: windowWidth * 0.45,
  },
  button: {
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#51C091',
    padding: 10,
    width: windowWidth * 0.45,
  },
  TextOUline: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    fontSize: 14,
    fontStyle: 'normal',
    lineHeight: 21,
    color: '#FB876E',
  },
  textButton: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    fontSize: 14,
    fontStyle: 'normal',
    lineHeight: 21,
    color: '#fff',
  },
});

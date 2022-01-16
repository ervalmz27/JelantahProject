import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Header from '../../component/Header';
import QRCode from 'react-native-qrcode-svg';
import {Card, Avatar} from 'react-native-paper';
import CameraRoll from '@react-native-community/cameraroll';
import RNFS from 'react-native-fs';
import moment from 'moment';
import {IMAGE_URL} from '../../../config/env';
import Waiting from '../../../assets/Images/Icon/Waiting.svg';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NotifQr = ({navigation, route}) => {
  const {detail} = route.params;
  console.log('detail----------->', detail[0]);
  const handleSave = () => {
    RNFS.writeFile(RNFS.CachesDirectoryPath + '/some-name.png', 'base64')
      .then(success => {
        return CameraRoll.save(
          RNFS.CachesDirectoryPath + '/some-name.png',
          'photo',
        );
      })
      .then(res => {
        console.log('sssssss', res);
        ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT);
      });
  };
  return (
    <>
      <Header
        name="Jadwal Disetujui"
        icon="chevron-left"
        onClick={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.notif}>
        {/* <Waiting height={20} width={20} /> */}
        <Text
          style={[
            styles.text,
            {
              color: '#51C091',
              fontFamily: 'Poppins-Bold',
              fontWeight: '600',
            },
          ]}>
          {detail[0].status}
        </Text>
      </View>
      <ScrollView>
        <Card
          style={{
            padding: 15,
            marginHorizontal: 20,
            height: windowHeight * 0.45,
            marginTop: windowHeight * 0.1,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <QRCode value={IMAGE_URL + detail[0].url_qr_code} size={100} />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 10,
            }}>
            <Text style={styles.firs}>Code Setoran</Text>
            <Text style={styles.qr}>{detail[0].code_setoran}</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 10,
            }}>
            <Text style={styles.firs}>Tanggal Pengajuan</Text>
            <Text style={[styles.firs, {fontWeight: '400'}]}>
              {moment(detail[0].tanggal).format('DD-MM-YYYY')} {detail[0].jam}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 10,
            }}>
            <Text style={styles.firs}>Tanggal Disetujui</Text>
            <Text style={[styles.firs, {fontWeight: '400'}]}>
              {/* 27 November 2021 12:00 */}
            </Text>
          </View>
          <Text style={styles.content}>
            Harap tunjukkan kode QR ini saat menyetor limbah ke mitra yang
            dituju
          </Text>
        </Card>
      </ScrollView>
    </>
  );
};

export default NotifQr;

const styles = StyleSheet.create({
  firs: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
    color: '#263238',
  },
  qr: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
    color: '#51C091',
  },
  notif: {
    paddingHorizontal: 10,
    margin: 10,
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
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    height: 48,
    backgroundColor: '#51C091',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 10,
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

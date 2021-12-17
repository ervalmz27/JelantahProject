import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../component/Header';

const Notificat = ({navigation}) => {
  return (
    <>
      <Header
        name="Notifikasi"
        icon="chevron-left"
        onClick={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            navigation.navigate('detailNotif');
          }}>
          <Text style={styles.title}>Jadwal setoran berhasil diterima</Text>
          <Text numberOfLines={1}>
            Jadwal kamu sudah diterima, silakan cek kode QR nya
          </Text>
          <Text style={styles.texttime}>5 jam lalu</Text>
          <View
            style={{
              borderBottomColor: '#E5E5E5',
              borderBottomWidth: 1,
              marginTop: 5,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          <Text style={styles.title}>Yeay, kamu baru aja dapat Rp50.000</Text>
          <Text numberOfLines={1}>
            Habis jual limbah langsung dapat uang, yuk cek sekarang juga
          </Text>
          <Text style={styles.texttime}>5 jam lalu</Text>
          <View
            style={{
              borderBottomColor: '#E5E5E5',
              borderBottomWidth: 1,
              marginTop: 5,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          <Text style={styles.title}>
            Selamat! kamu berhak mendapatkan hadiah
          </Text>
          <Text numberOfLines={1}>
            Kamu telah menyelesaikan tugas dengan baik
          </Text>
          <Text style={styles.texttime}>5 jam lalu</Text>
          <View
            style={{
              borderBottomColor: '#E5E5E5',
              borderBottomWidth: 1,
              marginTop: 5,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          <Text style={styles.title}>
            Selamat! kamu berhak mendapatkan hadiah
          </Text>
          <Text numberOfLines={1}>
            Kamu telah menyelesaikan tugas dengan baik
          </Text>
          <Text style={styles.texttime}>5 jam lalu</Text>
          <View
            style={{
              borderBottomColor: '#E5E5E5',
              borderBottomWidth: 1,
              marginTop: 5,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          <Text style={styles.title}>
            Selamat! kamu berhak mendapatkan hadiah
          </Text>
          <Text numberOfLines={1}>
            Kamu telah menyelesaikan tugas dengan baik
          </Text>
          <Text style={styles.texttime}>5 jam lalu</Text>
          <View
            style={{
              borderBottomColor: '#E5E5E5',
              borderBottomWidth: 1,
              marginTop: 5,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.container}>
          <Text style={styles.title}>
            Selamat! kamu berhak mendapatkan hadiah
          </Text>
          <Text numberOfLines={1}>
            Kamu telah menyelesaikan tugas dengan baik
          </Text>
          <Text style={styles.texttime}>5 jam lalu</Text>
          <View
            style={{
              borderBottomColor: '#E5E5E5',
              borderBottomWidth: 1,
              marginTop: 5,
            }}
          />
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default Notificat;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 1,
    fontFamily: 'Poppins-SemiBold',
    color: '#263238',
  },
  texttime: {
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 21,
    letterSpacing: 1,
    fontFamily: 'Poppins-Reguler',
    color: '#26323833',
    lineHeight: 15,
    marginTop: 5,
  },
});

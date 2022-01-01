import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Header from '../component/Header';
import Stuff from '../../assets/Images/content/Stuff.svg';

import {TouchableOpacity} from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Tugas = () => {
  return (
    <>
      {/* <Header name="Tugas" /> */}

      <ScrollView>
        <ImageBackground
          source={require('../../assets/Images/bghomge.jpg')}
          resizeMode="cover"
          style={styles.image}>
          <View style={{paddingHorizontal: 20, marginTop: -10}}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 16,
              }}>
              Tugas
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: 20,
            }}>
            <TouchableOpacity style={styles.content}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Stuff height={100} width={100} />
                <Text style={styles.Textcontent}>Sedang Dikerjakan</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.content}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Stuff height={100} width={100} />
                <Text style={styles.Textcontent}>Selesai</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.content}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Stuff height={100} width={100} />
                <Text style={styles.Textcontent}>Riwayat Tugas</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={{flex: 1, alignItems: 'center', marginTop: -60}}>
          <Image
            style={{
              height: 104,
              width: windowWidth * 0.9,
              borderRadius: 10,
              marginHorizontal: 20,
            }}
            resizeMode="cover"
            source={require('../../assets/Images/banner_info.png')}
          />
        </View>
        {/* ======================== Start Tugas Terbaru ================================ */}
        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <Text style={styles.contentHeader}>Tugas Terbaru</Text>
        </View>
        <View style={styles.contenImage}>
          <Image
            source={require('../../assets/Images/Icon/ContenTugas.png')}
            style={{height: 60, width: 55, borderRadius: 10}}
          />
          <View>
            <Text style={[styles.contentHeader, {fontSize: 12}]}>
              Misi Ajak 20 Teman Baru
            </Text>
            <Text
              style={[styles.contentHeader, {color: '263238', fontSize: 12}]}>
              Dapatkan hadiah 500 poin
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 10,
                color: '#F1B104',
              }}>
              100 peserta
            </Text>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 10,
                color: '#fff',
              }}>
              Mulai
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.contenImage, {marginTop: 5}]}>
          <Image
            source={require('../../assets/Images/Icon/ContenTugas.png')}
            style={{height: 60, width: 55, borderRadius: 10}}
          />
          <View>
            <Text style={[styles.contentHeader, {fontSize: 12}]}>
              Misi Ajak 20 Teman Baru
            </Text>
            <Text
              style={[styles.contentHeader, {color: '263238', fontSize: 12}]}>
              Dapatkan hadiah 500 poin
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 10,
                color: '#F1B104',
              }}>
              100 peserta
            </Text>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 10,
                color: '#fff',
              }}>
              Mulai
            </Text>
          </TouchableOpacity>
        </View>
        {/* ====================== end tugas Terbaru ===================================== */}
        {/* ======================== Start Tugas Saya ================================ */}
        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <Text style={styles.contentHeader}>Tugas Saya</Text>
        </View>
        <View style={[styles.contenImage]}>
          <Image
            source={require('../../assets/Images/Icon/ContenTugas.png')}
            style={{height: 60, width: 55, borderRadius: 10}}
          />
          <View>
            <Text style={[styles.contentHeader, {fontSize: 12}]}>
              Misi Ajak 20 Teman Baru
            </Text>
            <Text
              style={[styles.contentHeader, {color: '263238', fontSize: 12}]}>
              Dapatkan hadiah 500 poin
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 10,
                color: '#F1B104',
              }}>
              100 peserta
            </Text>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 10,
                color: '#fff',
              }}>
              Mulai
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default Tugas;

const styles = StyleSheet.create({
  tinyLogo: {
    height: 150,
    width: 150,
  },
  Textcontent: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 10,
    color: '#FFC727',
    width: 70,
    marginTop: -20,
  },
  content: {
    backgroundColor: '#FFFCE0',
    borderRadius: 10,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  contentHeader: {
    color: '#263238',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    height: windowHeight * 0.4,
  },
  contenImage: {
    padding: 10,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btn: {
    backgroundColor: '#51C091',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
});

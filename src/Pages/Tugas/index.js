import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import Header from '../component/Header';
import Stuff from '../../assets/Images/content/Stuff.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Tugas = () => {
  return (
    <>
      <Header name="Tugas" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: 20,
        }}>
        <TouchableOpacity
          style={{backgroundColor: '#FFFCE0', borderRadius: 10, height: 100}}>
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
        <TouchableOpacity
          style={{backgroundColor: '#FFFCE0', borderRadius: 10, height: 100}}>
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
        <TouchableOpacity
          style={{backgroundColor: '#FFFCE0', borderRadius: 10, height: 100}}>
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
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          style={{height: 94, width: 335}}
          source={require('../../assets/Images/banner_info.png')}
        />
      </View>
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
});

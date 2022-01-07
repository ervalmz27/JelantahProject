import {useFocusEffect} from '@react-navigation/core';
import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {getDataRiwayatDompet} from '../../../Apis/api/dashboard';
import {IMAGE_URL} from '../../../config/env';
import Header from '../../component/Header';
import Coin from '../../../assets/Images/Icon/Coin.svg';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
const RiwayatDompet = ({navigation}) => {
  const state = useSelector(state => state.users.login);
  const [converAktifitas, setConvertAktifitas] = useState([]);
  const [aktivitas, setAktivitas] = useState([]);
  useFocusEffect(
    useCallback(() => {
      RiwayatDompet();
    }, [state]),
  );
  const RiwayatDompet = async () => {
    const data = state[0].id_token;
    const Response = await getDataRiwayatDompet(data);
    console.log('Response----------->', Response.data.riwayat);
    const riwayat = Response.data.riwayat;
    setAktivitas(riwayat);
    let arr = [];
    for (let i = 0; i < riwayat.length; i++) {
      const element = riwayat[i].nilai;
      const format = element.toString().split('').reverse().join('');
      const convert = format.match(/\d{1,3}/g);
      const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('');

      arr.push(rupiah);
    }
    setConvertAktifitas(arr);
  };
  return (
    <>
      <Header
        name="Riwayat Dompet"
        icon="chevron-left"
        onClick={() => navigation.goBack()}
      />
      <View style={{padding: 20}}>
        <Text style={styles.title}>Aktifitas Terakhir</Text>
      </View>
      <ScrollView>
        {aktivitas.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                alert('Masih dalam pengembangan');
              }}
              style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: '100%',
              }}>
              <View>
                <View style={[styles.ball]}>
                  <Image
                    resizeMode="contain"
                    source={{uri: IMAGE_URL + item.icon}}
                    style={{width: 50, height: 50}}
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  marginLeft: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontWeight: '600',
                    fontSize: 12,
                  }}>
                  {item.activity}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontWeight: '500',
                    fontSize: 10,
                  }}>
                  {moment(item.datetime).format('DD-MM-YYYY HH:MM:ss')}
                </Text>
              </View>
              <View>
                <Text style={[styles.fontContent, {color: '#6FCF97'}]}>
                  {converAktifitas[index]}
                </Text>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Coin height={18} width={18} />
                  <Text
                    style={[
                      styles.fontContent,
                      {color: '#FFC727', marginLeft: 5},
                    ]}>
                    {item.poin} Poin
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );
};

export default RiwayatDompet;

const styles = StyleSheet.create({
  fontContent: {
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Poppins-Reguler',
  },
  contenHeader: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  ball: {
    borderRadius: 100,

    width: 56,
    height: 56,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    letterSpacing: 0.5,
    color: '#263238',
  },
});

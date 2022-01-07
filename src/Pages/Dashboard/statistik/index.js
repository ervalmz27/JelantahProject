import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {getDataStatistikSetoranDetail} from '../../../Apis/api/dashboard';
import {IMAGE_URL} from '../../../config/env';

import Header from '../../component/Header';

const Statistik = ({navigation}) => {
  const [aktivitas, setAktivitas] = useState([]);
  const state = useSelector(state => state.users.login);
  useEffect(() => {
    getStatistik(state[0].id_token);
  }, []);
  const [converAktifitas, setConvertAktifitas] = useState([]);
  const getStatistik = async item => {
    const Response = await getDataStatistikSetoranDetail(item);
    console.log('Response', Response.data.setoran);
    setAktivitas(Response.data.setoran);
    const data = Response.data.setoran;
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i].nilai;
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
        name="Statistik"
        icon="chevron-left"
        onClick={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.contenHeader}>
          <Text
            style={[
              styles.fontContent,
              {color: '#000', fontFamily: 'Poppins-Bold'},
            ]}>
            Semua Aktivitas
          </Text>
        </View>
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
                  {moment(item.datetime).format('MM-DD-YYYY HH:MM:ss')}
                </Text>
              </View>
              <View>
                <Text style={[styles.fontContent, {color: '#6FCF97'}]}>
                  {converAktifitas[index]}
                </Text>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* <Coin height={18} width={18} /> */}
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

export default Statistik;

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
});

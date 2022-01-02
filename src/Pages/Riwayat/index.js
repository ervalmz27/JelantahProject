import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {getDataRiwayat} from '../../Apis/api/dashboard';
import {IMAGE_URL} from '../../config/env';
import Header from '../component/Header';
import Coin from '../../assets/Images/Icon/Coin.svg';
const Riwayat = ({navigation}) => {
  const token = useSelector(state => state.users.login);
  const [aktivitas, setAktivitas] = useState([]);
  useEffect(() => {
    fetchRiwayat(token[0].id_token);
  }, []);
  const fetchRiwayat = async id_token => {
    const Response = await getDataRiwayat(id_token);
    console.log('Response----------->', Response.data.riwayat);
    setAktivitas(Response.data.riwayat);
  };
  return (
    <>
      <Header name="Riwayat" />
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
            <View
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
                  {item.datetime}
                </Text>
              </View>
              <View>
                <Text style={[styles.fontContent, {color: '#6FCF97'}]}>
                  {item.nilai}
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
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

export default Riwayat;

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

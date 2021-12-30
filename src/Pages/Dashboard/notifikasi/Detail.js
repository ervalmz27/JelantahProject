import React, {useEffect, useState, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {getDataPesanDetail} from '../../../Apis/api/dashboard';
import Coin from '../../../assets/Images/Icon/Coin.svg';
import {useFocusEffect} from '@react-navigation/native';
import Header from '../../component/Header';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Cheklist = ({navigation, route, userId}) => {
  const {detailNotif} = route.params;
  console.log('detailNotif', detailNotif);
  // const [message, setMessage] = useState('');
  // useEffect(() => {
  //   setMessage(detailNotif.pesan);
  // }, []);
  const [user, setUser] = useState(null);
  useFocusEffect(
    useCallback(() => {
      // return () => ();
      fetchDetail(detailNotif.id_pesan);
    }, []),
  );

  const fetchDetail = async id_pesan => {
    const Response = await getDataPesanDetail(id_pesan);
    console.log('Response ----> ', Response.data);
  };
  return (
    <>
      <Header
        icon="chevron-left"
        name="Detail Notifikasi"
        onClick={() => {
          navigation.goBack();
        }}
      />

      <View style={[styles.container, {marginTop: -280, marginBottom: 20}]}>
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <View>
            <Text
              style={[
                styles.header,
                {marginBottom: 16, fontFamily: 'Poppins-SemiBold'},
              ]}>
              {detailNotif.judul}
            </Text>
            <Text style={[styles.text, {marginHorizontal: 20}]}>
              {detailNotif.pesan}
            </Text>
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
      {/* <View style={{margin: 10}}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}>
          <Text
            style={{color: '#fff', fontSize: 14, fontFamily: 'Poppins-Bold'}}>
            Cek Saldo
          </Text>
        </TouchableOpacity>
      </View> */}
    </>
  );
};

export default Cheklist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#51C091',
    fontFamily: 'Poppins-Reguler',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Poppins-Reguler',
    fontWeight: '400',
    fontSize: 14,
  },
  Button: {
    height: 48,
    backgroundColor: '#51C091',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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

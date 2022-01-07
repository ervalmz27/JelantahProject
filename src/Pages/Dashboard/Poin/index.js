import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Coin from '../../../assets/Images/Icon/Coin.svg';
import TarikSaldo from '../../../assets/Images/Icon/TarikSaldo.svg';
import {useSelector} from 'react-redux';
import {getDataAktifitasTerakhir} from '../../../Apis/api/dashboard';
import {IMAGE_URL} from '../../../config/env';
import moment from 'moment';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Poin = ({navigation}) => {
  const state = useSelector(state => state.users.login);
  const [rupiah, setRupiah] = useState('');
  const [aktivitas, setAktivitas] = useState([]);
  const [converAktifitas, setConvertAktifitas] = useState([]);
  console.log('state', state);
  useEffect(() => {
    convertSaldo();
    aktivitasTerakhir(state[0].id_token);
  }, []);
  const convertSaldo = () => {
    const numb = state[0].user_wallet;
    const format = numb.toString().split('').reverse().join('');
    const convert = format.match(/\d{1,3}/g);
    const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('');
    setRupiah(rupiah);
  };
  // getDataAktifitasTerakhirDompet
  const aktivitasTerakhir = async token => {
    const Response = await getDataAktifitasTerakhir(token);
    console.log('Response -->', Response.data.aktifitas);
    const data = Response.data.aktifitas;
    setAktivitas(Response.data.aktifitas);
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
      <ScrollView>
        <ImageBackground
          source={require('../../../assets/Images/bghomge.jpg')}
          style={styles.background}>
          <TouchableOpacity
            style={{
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon
              name="chevron-left"
              color="#fff"
              style={{marginRight: 15}}
              size={20}
            />
            <Text style={styles.header}>Poin</Text>
          </TouchableOpacity>
          <View style={styles.rowContent}>
            <View style={{}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: windowWidth * 1,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={[styles.text, {marginRight: 4}]}>Poin Saya</Text>
                  <Coin height={14} width={14} />
                </View>
                {/* <TouchableOpacity
                  style={styles.content}
                  onPress={() => {
                    alert('Masih dalam tahap pengembangan');
                  }}>
                  <Coin height={16} width={16} />
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Poppins-Regular',
                      marginLeft: 10,
                    }}>
                    
                </TouchableOpacity> */}
              </View>

              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: '#fff',
                  fontSize: 24,
                  letterSpacing: 0.5,
                  marginTop: -10,
                }}>
                {state[0].user_poin} Poin
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.containerConten}>
          <View style={styles.cardContent}>
            <TouchableOpacity
              style={{alignItems: 'center', width: 68}}
              onPress={() => {
                navigation.navigate('Tarik');
              }}>
              <TarikSaldo height={32} width={32} />
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  marginTop: 5,
                }}>
                Tarik Saldo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center', width: 68}}
              onPress={() => {
                navigation.navigate('RiwayatDompet');
              }}>
              <Image
                // source={require('../../assets/Images/home/riwayat.png')}
                source={require('../../../assets/Images/home/riwayat.png')}
                resizeMode="contain"
                style={{
                  tintColor: '#51C091',
                  width: 30,
                  height: 50,
                }}
              />
              <Text style={{textAlign: 'center'}}>Riwayat</Text>
            </TouchableOpacity>
          </View>
          <View style={{padding: 20}}>
            <Text style={styles.title}>Aktifitas Terakhir</Text>
          </View>
          {aktivitas.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  alert('Masih dalam tahap pengembangan');
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
                  <Text
                    key={index}
                    style={[styles.fontContent, {color: '#6FCF97'}]}>
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
        </View>
      </ScrollView>
    </>
  );
};

export default Poin;

const styles = StyleSheet.create({
  background: {
    // backgroundColor: '#51C091',
    zIndex: -1,
    height: windowHeight * 0.3,
  },
  fontContent: {
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Poppins-Reguler',
  },
  ball: {
    borderRadius: 100,

    width: 56,
    height: 56,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerConten: {
    backgroundColor: '#fff',
    zIndex: -1,
    borderTopLeftRadius: 20,
    marginTop: -25,
    borderTopRightRadius: 20,
    height: windowHeight * 1,
  },
  cardContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 10,
    marginTop: -30,
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    backgroundColor: '#EBEBEB',
    opacity: 0.7,
    marginRight: 20,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 37,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  rowContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    letterSpacing: 0.5,
    color: '#263238',
  },
});

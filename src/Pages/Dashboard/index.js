import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
  Animated,
  BackHandler,
  Alert,
  RefreshControl,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Dompet from '../../assets/Images/Icon/Dompet.svg';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardContent from './componen';
import Swiper from 'react-native-swiper';
import {LineChart} from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Datainfo,
  DataProfile,
  getDataProfil,
  getStatistik,
} from '../../Apis/api';
import {styles} from './style';
import Coin from '../../assets/Images/Icon/Coin.svg';
import {getLoginUsers} from '../../Apis/actions/users';

import Mitra_Personal_Usaha from './componen/Mitra_Personal_Usaha';
import Geolocation from '@react-native-community/geolocation';
import {
  getInfoTerkini,
  getDataSeputar,
  getDataAktifitasTerakhir,
} from '../../Apis/api/dashboard';
import {API_URL, IMAGE_URL} from '../../config/env';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/core';
import AppLoader from '../component/AppLoader';
import moment from 'moment';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const Dashboar = ({navigation}) => {
  const login = useSelector(state => state.users.login);

  const dispatch = useDispatch();
  const [mintra, setMitra] = useState('');
  const [rupiah, setRupiah] = useState('');
  const [profile, setProfile] = useState([]);
  const [point, setPoint] = useState('');
  const [notif, setNotif] = useState(0);
  const [loading, setLoading] = useState(false);
  const [datasers, setDataSers] = useState([]);
  const [infoTerkini, setInfoTerkini] = useState([]);
  const [seputarinfo, setSeputarinfo] = useState([]);
  const [aktivitas, setAktivitas] = useState([]);
  const [imgUrl, setImgUrl] = useState('');
  const [converAktifitas, setConvertAktifitas] = useState([]);

  const [statisti, setStatistik] = useState({
    labels: [],
  });

  useFocusEffect(
    useCallback(() => {
      dataProfile();
      dataStatis();
      dataPost();
      InfoTerkini();
      aktifitas();
      SeputarLimbah();
      const willFocusSubscription = navigation.addListener('focus', () => {
        dataStatis();
        dataPost();
        InfoTerkini();
        SeputarLimbah();
        aktifitas();
        dataProfile();
      });

      return willFocusSubscription;
    }, []),
  );

  const dataPost = useCallback(async () => {
    try {
      const user = await AsyncStorage.getItem('user_id');
      const Password = await AsyncStorage.getItem('user_password');
      DataProfile(user, Password).then(res => {
        const dataLogin = res.data.data;

        // console.log('dataLogin', dataLogin);
        fakePost(dataLogin);
      });
    } catch (error) {
      console.log(error);
    }
  });

  const dataProfile = async () => {
    const jsonToken = await AsyncStorage.getItem('token');

    const Response = await getDataProfil(jsonToken);
    console.log('Response---->', Response.data.profile);
    setProfile(Response.data.profile);
    convertSaldo(Response.data.profile);
    dispatch(getLoginUsers(Response.data.profile));
  };

  const fakePost = Login => {
    Login.forEach(async el => {
      let mitra = el.user_level_nama;
      let img = el.user_urlpp;
      setImgUrl(img);
      // console.log('Hallo', img);
      setMitra(mitra);
      setPoint(el.user_poin);
      Datainfo(el.id_token).then(res => {
        let data = res.data.data;

        data.forEach(item => {
          setNotif(item.user_pesan);
        });
      });
    });
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    if (navigation.isFocused()) {
      Alert.alert('Perhatian!', 'Apakah anda akan keluar aplikasi?', [
        {
          text: 'Tidak',
          onPress: () => null,
          style: 'tidak',
        },
        {text: 'Ya', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    }
  };

  const dataStatis = async token => {
    const Token = await AsyncStorage.getItem('token');

    const statistik = await getStatistik(Token);

    const all = statistik.data.datasets;

    setStatistik({...statisti, labels: statistik.data.label});
    setDataSers(all);
  };

  const InfoTerkini = async () => {
    const info = await getInfoTerkini();
    // console.log('info terkini', info.data.info_terkini);
    setInfoTerkini(info.data.info_terkini);
  };

  const SeputarLimbah = async () => {
    const seputar = await getDataSeputar();
    // console.log('seputar', seputar.data.seputar);
    setSeputarinfo(seputar.data.seputar);
  };
  const aktifitas = async () => {
    const Token = await AsyncStorage.getItem('token');
    console.log(Token);
    const Response = await getDataAktifitasTerakhir(Token);
    const data = Response.data.aktifitas;
    setAktivitas(data);
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i].nilai;

      const format = element.toString().split('').reverse().join('');
      const convert = format.match(/\d{1,3}/g);
      const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('');
      // console.log('===========>', rupiah);
      arr.push(rupiah);
    }
    // console.log('Rupiah', arr);
    setConvertAktifitas(arr);
  };
  // console.log('convertAktiv,', converAktifitas);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dataPost();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  const convertSaldo = item => {
    const numb = item[0].user_wallet;
    const format = numb.toString().split('').reverse().join('');
    const convert = format.match(/\d{1,3}/g);
    const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('');
    setRupiah(rupiah);
  };

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#51C091"
        translucent
        backgroundColor="transparent"
      />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{backgroundColor: '#fff'}}>
        <ImageBackground
          source={require('../../assets/Images/bghomge.jpg')}
          style={styles.background}>
          <View style={styles.rowContent}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
              }}>
              <Image source={{uri: IMAGE_URL + imgUrl}} style={styles.img} />
              <View>
                {profile.map((i, idx) => {
                  return (
                    <View key={idx} style={{marginLeft: 5}}>
                      <Text
                        style={{
                          color: '#fff',
                          fontFamily: 'Poppins-SemiBold',
                          fontSize: 14,
                          fontWeight: '600',
                        }}>
                        {i.user_fnama}
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontFamily: 'Poppins-Reguler',
                          fontSize: 12,
                          fontWeight: '600',
                        }}>
                        {i.user_level_nama}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('notification');
              }}>
              {notif != 0 ? (
                <View style={styles.notifit}>
                  {profile.map((item, idx) => {
                    return (
                      <Text
                        key={idx}
                        style={{
                          fontSize: 10,
                          color: '#fff',
                          fontWeight: '700',
                        }}>
                        {item.user_pesan}
                      </Text>
                    );
                  })}
                </View>
              ) : null}

              <View style={{zIndex: -1}}>
                <Icon name="bell" size={24} color="#fff" solid />
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {profile.map((item, idx) => {
          return (
            <View style={[styles.card, styles.content]}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                }}
                onPress={() => {
                  navigation.navigate('Dompet');
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Dompet');
                  }}>
                  <Dompet height={30} width={30} />
                </TouchableOpacity>
                <View style={{flexDirection: 'column', marginLeft: 10}}>
                  <Text style={styles.textJersey}>Saldo Dompet</Text>
                  <Text
                    style={[
                      styles.textJersey,
                      {color: '#263238', fontSize: 16},
                    ]}>
                    {rupiah}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.poin}
                onPress={() => {
                  navigation.navigate('poin');
                }}>
                <View
                  style={{
                    borderRadius: 100,
                    width: 40,
                    height: 40,
                    borderWidth: 3,
                    borderColor: '#51C091',
                    padding: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      fontSize: 16,
                      color: '#51C091',
                    }}>
                    JP
                  </Text>
                </View>
                <View style={{flexDirection: 'column', marginLeft: 10}}>
                  <Text style={styles.textJersey}>Jelanta Points</Text>
                  <Text
                    style={[
                      styles.textJersey,
                      {color: '#263238', fontSize: 16},
                    ]}>
                    {item.user_poin} Poin
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}

        {mintra == 'Mitra RT' ||
        mintra == 'Mitra Budaya' ||
        mintra == 'Mitra RW' ||
        mintra == 'Mitra Kelurahan' ||
        mintra == 'Mitra Kecamatan' ||
        mintra == 'MitraProvDKI' ||
        mintra == 'MitraKotaJaksel' ||
        mintra == 'Mitra Validator' ||
        mintra == 'Mitra Transporter' ||
        mintra == 'Mitra Gudang' ||
        mintra == 'Mitra Agen CP' ? (
          <CardContent
            onSetor={() => navigation.push('Setor')}
            onJadwal={() => {
              navigation.navigate('TerimaJadwal');
            }}
            pressTarik={() => navigation.navigate('Tarik')}
            cekJadwal={() => navigation.navigate('CekJadwal')}
            onTerima={() => {
              navigation.navigate('codeQr');
            }}
          />
        ) : (
          <Mitra_Personal_Usaha
            onSetor={() => navigation.push('Setor')}
            cekJadwal={() => navigation.navigate('CekJadwal')}
            pressTarik={() => navigation.navigate('Tarik')}
          />
        )}

        <View style={{marginHorizontal: 20}}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text
              style={[
                styles.fontContent,
                {color: '#000', fontFamily: 'Poppins-Bold'},
              ]}>
              Statistik Setoran
            </Text>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => navigation.navigate('DetailStatistik')}>
              <Text style={{color: '#51C091B2'}}>Detail</Text>
              <Icon
                name="chevron-right"
                color="#51C091B2"
                style={{marginLeft: 5}}
              />
            </TouchableOpacity>
          </View>
          {datasers.length > 0 ? (
            <LineChart
              data={{
                labels: statisti.labels,
                datasets: datasers,
              }}
              width={windowWidth * 0.9} // from react-native
              height={windowHeight * 0.3}
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: '#51C091',
                backgroundGradientFrom: '#51C091',
                backgroundGradientTo: '#51C091',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          ) : null}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 10,
          }}>
          <Text
            style={[
              styles.fontContent,
              {color: '#000', fontFamily: 'Poppins-Bold'},
            ]}>
            Info Terkini
          </Text>
          {/* <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: '#51C091B2'}}>Info Lainnya</Text>
            <Icon
              name="chevron-right"
              color="#51C091B2"
              style={{marginLeft: 5}}
            />
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            marginTop: 20,
            height: 150,
            alignItems: 'center',
            justifyContent: 'center',
            width: windowWidth * 1,
          }}>
          <Swiper autoplay={true} showsButtons={false} showsPagination={false}>
            {infoTerkini.map((i, idx) => {
              return (
                <TouchableOpacity
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  }}
                  onPress={() => {
                    alert('Masih dalam tahap pengembangan');
                  }}>
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri: IMAGE_URL + i.banner_url,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </Swiper>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 10,
          }}>
          <Text
            style={[
              styles.fontContent,
              {color: '#000', fontFamily: 'Poppins-Bold'},
            ]}>
            Aktivitas Terakhir
          </Text>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              navigation.navigate('riwayat');
            }}>
            <Text style={{color: '#51C091B2'}}>Semua</Text>
            <Icon
              name="chevron-right"
              color="#51C091B2"
              style={{marginLeft: 5}}
            />
          </TouchableOpacity>
        </View>
        {/* ================Aktivitas Terakhir */}
        {aktivitas.map((item, index) => {
          return (
            <TouchableOpacity
              style={{
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: '100%',
              }}
              onPress={() => {
                alert('Masih dalam tahap pengembangan');
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

        {/* end aktifitas */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 10,
          }}>
          <Text
            style={[
              styles.fontContent,
              {color: '#000', fontFamily: 'Poppins-Bold'},
            ]}>
            Seputar Limbah
          </Text>
          {/* <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: '#51C091B2'}}>Semua</Text>
            <Icon
              name="chevron-right"
              color="#51C091B2"
              style={{marginLeft: 5}}
            />
          </TouchableOpacity> */}
          {/* Swipper */}
        </View>

        <ScrollView horizontal={true}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            {seputarinfo.map((i, idx) => {
              return (
                <>
                  <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <TouchableOpacity
                      style={{marginHorizontal: 15}}
                      key={idx}
                      onPress={() => {
                        alert('Masih dalam tahap pengembangan');
                      }}>
                      <Image
                        resizeMode="contain"
                        source={{uri: IMAGE_URL + i.thumbnail}}
                        style={{width: 170, height: 100, borderRadius: 10}}
                      />
                    </TouchableOpacity>
                    <Text style={styles.textLimbah}>{i.judul_seputar}</Text>
                  </View>
                </>
              );
            })}
          </View>
        </ScrollView>
      </ScrollView>
      {/* )} */}
      {loading == true ? <AppLoader /> : null}
    </>
  );
};

export default Dashboar;

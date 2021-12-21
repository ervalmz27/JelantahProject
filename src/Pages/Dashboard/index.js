import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Dompet from '../../assets/Images/Icon/Dompet.svg';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardContent from './componen';
import Swiper from 'react-native-swiper';
import {LineChart} from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Datainfo, DataProfile, getStatistik} from '../../Apis/api';
import Minyak from '../../assets/Images/home/Minyak.svg';
import {styles} from './style';
import Coin from '../../assets/Images/Icon/Coin.svg';
import {getLoginUsers} from '../../Apis/actions/users';
import moment from 'moment';
import Mitra_Personal_Usaha from './componen/Mitra_Personal_Usaha';
import {Modal} from 'react-native-paper';
import {
  getInfoTerkini,
  getDataSeputar,
  getDataAktifitasTerakhir,
} from '../../Apis/api/dashboard';
import {API_URL, IMAGE_URL} from '../../config/env';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Dashboar = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // console.log('Reduxxx ', dataLogin);
  const dispatch = useDispatch();
  const [mintra, setMitra] = useState('');
  const [rupiah, setRupiah] = useState('');
  const [profile, setProfile] = useState([]);
  const [point, setPoint] = useState('');
  const [notif, setNotif] = useState('');
  const [loading, setLoading] = useState(false);
  const [datasers, setDataSers] = useState([]);
  const [infoTerkini, setInfoTerkini] = useState([]);
  const [seputarinfo, setSeputarinfo] = useState([]);
  const [aktivitas, setAktivitas] = useState([]);
  const [statisti, setStatistik] = useState({
    labels: [],
  });
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Apakah Anda Ingin Keluar Dari Aplikasi?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    setLoading(true);
    dataStatis();
    dataPost();
    InfoTerkini();
    SeputarLimbah();
    aktifitas();
    return () => backHandler.remove();
  }, []);

  const dataPost = async () => {
    setLoading(true);
    try {
      const user = await AsyncStorage.getItem('user_id');
      const Password = await AsyncStorage.getItem('user_password');
      DataProfile(user, Password).then(res => {
        const dataLogin = res.data.data;
        // console.log(dataLogin);
        setProfile(dataLogin);
        dispatch(getLoginUsers(dataLogin));
        // console.log('dataLogin', dataLogin);
        dataLogin.forEach(async el => {
          // console.log('mitra', el.id_token);

          let mitra = el.user_level_nama;
          setMitra(mitra);
          setPoint(el.user_poin);
          Datainfo(el.id_token).then(res => {
            let data = res.data.data;

            data.forEach(item => {
              setNotif(item.user_pesan);
              const numb = item.user_wallet;
              const format = numb.toString().split('').reverse().join('');
              const convert = format.match(/\d{1,3}/g);
              const rupiah =
                'Rp ' + convert.join('.').split('').reverse().join('');
              setRupiah(rupiah);
              setLoading(false);
            });
          });
        });
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
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
    console.log('Response', Response.data.aktifitas);
    const data = Response.data.aktifitas;
    setAktivitas(data);
    data.forEach(al => {
      const numb = al.nilai;
      const format = numb.toString().split('').reverse().join('');
      const convert = format.match(/\d{1,3}/g);
      const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('');
      console.log(rupiah);
    });
  };

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#51C091"
        translucent
        backgroundColor="transparent"
      />
      {/* {loading == true ? (
        <Modal
          visible={loading}
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#51C091',
          }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </Modal>
      ) : ( */}
      <ScrollView>
        <ImageBackground
          source={require('../../assets/Images/bghomge.jpg')}
          style={styles.background}>
          <View style={styles.rowContent}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
              }}>
              <Image
                source={require('../../assets/Images/home/profile.jpg')}
                style={styles.img}
              />
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
              <View style={styles.notifit}>
                <Text style={{fontSize: 10, color: '#fff', fontWeight: '700'}}>
                  {notif}
                </Text>
              </View>

              <View style={{zIndex: -1}}>
                <Icon name="bell" size={24} color="#fff" solid />
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={[styles.card, styles.content]}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Dompet height={30} width={30} />
            <View style={{flexDirection: 'column', marginLeft: 10}}>
              <Text style={styles.textJersey}>Saldo Dompet</Text>
              <Text style={[styles.textJersey, {color: '#000'}]}>{rupiah}</Text>
            </View>
          </View>
          <View style={styles.poin}>
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
              <Text style={[styles.textJersey, {color: '#000'}]}>
                {point} Poin
              </Text>
            </View>
          </View>
        </View>
        {mintra == 'Mitra RT' ||
        mintra == 'Mitra Budaya' ||
        mintra == 'Mitra RW' ||
        mintra == 'Mitra Kelurahan' ||
        mintra == 'Mitra Kecamatan' ||
        mintra == 'MitraProvDKI' ||
        mintra == 'MitraKotaJaksel' ||
        mintra == 'Mitra Validator' ||
        mintra == 'Mitra Transporter' ||
        mintra == 'Mitra Gudang' ? (
          <CardContent
            onSetor={() => navigation.push('Setor')}
            onJadwal={() => {
              navigation.navigate('TerimaJadwal');
            }}
            cekJadwal={() => navigation.navigate('CekJadwal')}
          />
        ) : (
          <Mitra_Personal_Usaha onSetor={() => navigation.push('Setor')} />
        )}

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
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: '#51C091B2'}}>Info Lainnya</Text>
            <Icon
              name="chevron-right"
              color="#51C091B2"
              style={{marginLeft: 5}}
            />
          </TouchableOpacity>
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
            {/* <ScrollView horizontal={true}> */}
            {infoTerkini.map((i, idx) => {
              return (
                <View>
                  <Image
                    style={styles.tinyLogo}
                    resizeMode="contain"
                    source={{
                      uri: IMAGE_URL + i.banner_url,
                    }}
                  />
                  {/* <Text>{i.banner_url}</Text> */}
                </View>
              );
            })}
            {/* </ScrollView> */}
          </Swiper>
        </View>
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
              style={{flexDirection: 'row', alignItems: 'center'}}>
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
            Aktivitas Terakhir
          </Text>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
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
                  {moment(item.datetime).format('HH:mm')}
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
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: '#51C091B2'}}>Semua</Text>
            <Icon
              name="chevron-right"
              color="#51C091B2"
              style={{marginLeft: 5}}
            />
          </TouchableOpacity>
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
                    <TouchableOpacity style={{marginHorizontal: 15}} key={idx}>
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
    </>
  );
};

export default Dashboar;

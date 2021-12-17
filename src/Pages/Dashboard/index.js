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
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Dompet from '../../assets/Images/Icon/Dompet.svg';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardContent from './componen';
import Swiper from 'react-native-swiper';
import {LineChart} from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Datainfo, DataProfile} from './api';
import Minyak from '../../assets/Images/home/Minyak.svg';
import {styles} from './style';
import Coin from '../../assets/Images/Icon/Coin.svg';
import Geolocation from '@react-native-community/geolocation';
import SampleJson from '../../Apis/Json/sampleStatistik.json';
const windowWidth = Dimensions.get('window').width;
const image = {uri: 'https://reactjs.org/logo-og.png'};
const Dashboar = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);
  const [walet, setWalet] = useState([]);
  const [rupiah, setRupiah] = useState('');
  const [profile, setProfile] = useState([]);
  const [point, setPoint] = useState('');
  const [notif, setNotif] = useState('');
  const [statisti, setStatistik] = useState({
    data: [],
    labels: [],
  });
  useEffect(() => {
    console.log('sample', SampleJson.datasets[0].data);
    setStatistik({
      ...statisti,
      labels: SampleJson.labels,
      data: SampleJson.datasets[0].data,
    });

    Geolocation.getCurrentPosition(info => console.log(info));
    dataPost();
  }, []);

  const dataPost = async () => {
    const user = await AsyncStorage.getItem('user_id');
    const Password = await AsyncStorage.getItem('user_password');
    DataProfile(user, Password).then(res => {
      const dataLogin = res.data.data;
      setProfile(dataLogin);
      dataLogin.forEach(el => {
        setPoint(el.user_poin);
        Datainfo(el.id_token).then(res => {
          let data = res.data.data;
          setWalet(data);
          data.forEach(item => {
            setNotif(item.user_pesan);
            const numb = item.user_wallet;
            const format = numb.toString().split('').reverse().join('');
            const convert = format.match(/\d{1,3}/g);
            const rupiah =
              'Rp ' + convert.join('.').split('').reverse().join('');
            setRupiah(rupiah);
          });
        });
        // Notif(el.id_token).then(res => {
        //   setNotif(res.data.data);
        // });
      });
    });
  };
  return (
    <>
      <ScrollView>
        <StatusBar animated={true} backgroundColor="#51C091" />
        <ImageBackground
          source={require('../../assets/Images/bghomge.jpg')}
          style={styles.background}>
          <View style={styles.rowContent}>
            <View style={{flexDirection: 'row', flex: 1, padding: 10}}>
              <Image
                source={require('../../assets/Images/home/profile.jpg')}
                style={styles.img}
              />
              <View style={{marginLeft: 10}}>
                {profile.map((i, idx) => {
                  return (
                    <View key={idx}>
                      <Text
                        style={{
                          color: '#fff',
                          fontFamily: 'Poppins-Reguler',
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
        <CardContent onSetor={() => navigation.navigate('Setor')} />
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
        <View style={{marginTop: 20, height: 150}}>
          <Swiper showsButtons={false} showsPagination={false}>
            <View>
              <Image
                style={styles.tinyLogo}
                source={require('../../assets/Images/banner.png')}
              />
            </View>
            <View>
              <Image
                style={styles.tinyLogo}
                source={require('../../assets/Images/banner.png')}
              />
            </View>
            <View>
              <Image
                style={styles.tinyLogo}
                source={require('../../assets/Images/banner.png')}
              />
            </View>
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
          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={windowWidth * 0.9} // from react-native
            height={220}
            // yAxisLabel="$"
            // yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
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
              <Minyak height={28} width={28} />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              marginLeft: 5,
            }}>
            <Text style={styles.fontContent}>Setor Minyak Jelanta 5 Kg</Text>
            <Text>Hari ini • 07:00</Text>
          </View>
          <View>
            <Text style={[styles.fontContent, {color: '#6FCF97'}]}>
              + Rp10.000
            </Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Coin height={18} width={18} />
              <Text
                style={[styles.fontContent, {color: '#FFC727', marginLeft: 5}]}>
                50 Poin
              </Text>
            </View>
          </View>
        </View>
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
              <Minyak height={28} width={28} />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              marginLeft: 5,
            }}>
            <Text style={styles.fontContent}>Setor Minyak Jelanta 5 Kg</Text>
            <Text>Hari ini • 07:00</Text>
          </View>
          <View>
            <Text style={[styles.fontContent, {color: '#6FCF97'}]}>
              + Rp10.000
            </Text>
            {/* #FFC727 */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Coin height={18} width={18} />
              <Text
                style={[styles.fontContent, {color: '#FFC727', marginLeft: 5}]}>
                50 Poin
              </Text>
            </View>
          </View>
        </View>
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
        <View>
          <Swiper style={styles.wrapper} showsButtons={false}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.contentLimbah}
                resizeMode="contain"
                source={require('../../assets/Images/home/contenlimbah.jpg')}
                style={{width: 150}}
              />
              <Image
                style={styles.contentLimbah}
                resizeMode="contain"
                style={{width: 150, marginLeft: 15}}
                source={require('../../assets/Images/home/contenLimbah1.png')}
              />
            </View>
          </Swiper>
        </View>
      </ScrollView>
    </>
  );
};

export default Dashboar;

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Coin from '../../assets/Images/Icon/Coin.svg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Dompet from '../../assets/Images/Icon/Dompet.svg';
import Lupas from '../../assets/Images/Icon/Lupas.svg';
import Tentang from '../../assets/Images/Icon/Tentang.svg';
import Bantuan from '../../assets/Images/Icon/Bantuan.svg';
import {useSelector} from 'react-redux';
import Voucer from '../../assets/Images/Icon/Voucer.svg';
import Rekening from '../../assets/Images/home/Rekening.svg';
import {IMAGE_URL} from '../../config/env';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const User = ({navigation}) => {
  const Profil = useSelector(state => state.users.login);
  const dashboard = useSelector(state => state.users.dashboard);
  console.log('data users', Profil);
  const [rupiah, setRupiah] = useState('');
  const Logout = () => {
    navigation.navigate('Auth');
    AsyncStorage.clear();
    AsyncStorage.removeItem('user_id');
    AsyncStorage.removeItem('user_password');
    AsyncStorage.removeItem('token');
  };
  useEffect(() => {
    convert();
    const willFocusSubscription = navigation.addListener('focus', () => {
      Profil;
    });

    return willFocusSubscription;
  }, []);
  const convert = () => {
    const numb = Profil[0].user_wallet;
    const format = numb.toString().split('').reverse().join('');
    const convert = format.match(/\d{1,3}/g);
    const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('');
    setRupiah(rupiah);
  };

  return (
    <>
      <ScrollView style={{backgroundColor: '#fff'}}>
        <ImageBackground
          source={require('../../assets/Images/bghomge.jpg')}
          style={styles.background}>
          {Profil.map((i, idx) => {
            return (
              <View style={styles.rowContent}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                  }}>
                  <Image
                    source={{
                      uri: IMAGE_URL + i.user_urlpp,
                    }}
                    style={styles.img}
                  />
                  <View>
                    <View key={idx} style={{padding: 16}}>
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
                  </View>
                </View>
              </View>
            );
          })}
        </ImageBackground>

        {Profil.map((item, idx) => {
          return (
            <View style={[styles.card, styles.content]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Dompet');
                }}
                style={{
                  flexDirection: 'row',
                }}>
                <Dompet height={30} width={30} />
                <View style={{flexDirection: 'column', marginLeft: 10}}>
                  <Text style={styles.textJersey}>Saldo Dompet</Text>
                  <Text style={[styles.textJersey, {color: '#000'}]}>
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
                  <Text style={[styles.textJersey, {color: '#000'}]}>
                    {item.user_poin} Poin
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
        {/* ==================== Start  Content Header ======================= */}
        <View style={{paddingHorizontal: 20, paddingTop: 15}}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: '#263238',
              fontSize: 16,
            }}>
            Akun
          </Text>
        </View>
        <TouchableOpacity
          style={styles.containerContent}
          onPress={() => {
            alert('Masih dalam tahap pengembangan');
          }}>
          <View style={{flexDirection: 'row'}}>
            <Voucer width={24} height={24} />
            <Text style={styles.textContent}>Voucer Saya</Text>
          </View>
          <View>
            <Icon name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerContent}
          onPress={() => {
            navigation.navigate('tugas');
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              resizeMode="contain"
              source={require('../../assets/Images/home/piala.png')}
              style={{tintColor: '#C7C7C7'}}
            />
            <Text style={styles.textContent}>Tugas Saya</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                marginRight: 10,
              }}>
              {Profil[0].user_tugas + ' Tugas'}
            </Text>
            <Icon name="chevron-right" />
          </View>
        </TouchableOpacity>
        {/* ===================== End Content Header ================= */}

        {/* ===================== Start Content Akun ================= */}

        <View style={{padding: 20}}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: '#263238',
              fontSize: 16,
            }}>
            Akun
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.containerContent, {marginTop: -10}]}
          onPress={() => {
            navigation.navigate('Akun');
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="user" size={20} color="#C7C7C7" solid />
            <Text style={styles.textContent}> Informasi Pribadi</Text>
          </View>
          <View>
            <Icon name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.containerContent]}
          onPress={() => {
            alert('Masih dalam tahap pengembangan');
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="at" size={20} color="#C7C7C7" solid />
            <Text style={styles.textContent}>ID Jelanta</Text>
          </View>
          <View>
            <Icon name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.containerContent]}
          onPress={() => {
            navigation.navigate('dashboarRekening');
          }}>
          <View style={{flexDirection: 'row'}}>
            {/* <Icon name="at" size={20} color="#C7C7C7" solid /> */}
            <Rekening height={20} width={20} />
            <Text style={styles.textContent}>Rekening Bank</Text>
          </View>
          <View>
            <Icon name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.containerContent]}
          onPress={() => {
            navigation.navigate('DashboarEwalet');
          }}>
          <View style={{flexDirection: 'row'}}>
            {/* <Icon name="at" size={20} color="#C7C7C7" solid /> */}
            <Dompet height={20} width={20} />
            <Text style={styles.textContent}>E-Wallet</Text>
          </View>
          <View>
            <Icon name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.containerContent]}
          onPress={() => {
            navigation.navigate('Alamatmaps');
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="map-marker-alt" size={20} color="#C7C7C7" solid />

            <Text style={styles.textContent}>Geolokasi</Text>
          </View>
          <View>
            <Icon name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.containerContent]}
          onPress={() => {
            navigation.navigate('ChangePassword');
          }}>
          <View style={{flexDirection: 'row'}}>
            <Lupas height={20} width={20} />

            <Text style={styles.textContent}>Lupa Password</Text>
          </View>
          <View>
            <Icon name="chevron-right" />
          </View>
        </TouchableOpacity>
        {/* ====================== End Content Akun */}
        {/* ====================== Start Lainnya ======================== */}

        <View style={{padding: 20}}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: '#263238',
              fontSize: 16,
            }}>
            Lainnya
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.containerContent, {marginTop: -10}]}
          onPress={() => {
            alert('Masih dalam tahap pengembangan');
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="bell" size={20} color="#C7C7C7" solid />
            <Text style={styles.textContent}>Kelola Notifikasi</Text>
          </View>
          <View>
            <Icon name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.containerContent]}
          onPress={() => {
            alert('Masih dalam tahap pengembangan');
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="user-plus" size={20} color="#C7C7C7" solid />
            <Text style={styles.textContent}>Ajak Teman</Text>
          </View>
          <View>
            <Icon name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.containerContent]}
          onPress={() => {
            alert('Masih dalam tahap pengembangan');
          }}>
          <View style={{flexDirection: 'row'}}>
            <Tentang height={20} width={20} />
            <Text style={styles.textContent}>Tentang Aplikasi</Text>
          </View>
          <View>
            <Icon name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.containerContent]}
          onPress={() => {
            alert('Masih dalam tahap pengembangan');
          }}>
          <View style={{flexDirection: 'row'}}>
            <Bantuan height={20} width={20} />
            <Text style={styles.textContent}>Pusat Bantuan</Text>
          </View>
          <View>
            <Icon name="chevron-right" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.containerContent]}
          onPress={() => {
            alert('Masih dalam tahap pengembangan');
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="star" size={20} color="#C7C7C7" solid />
            <Text style={styles.textContent}>Beri Penilaian Aplikasi</Text>
          </View>
          <View>
            <Icon name="chevron-right" />
          </View>
        </TouchableOpacity>
        {/* ======================== End Content Lainnya ======================  */}
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Logout();
            }}>
            <Text
              style={{
                color: '#51C091',
                fontSize: 16,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default User;

const styles = StyleSheet.create({
  rowContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    width: windowWidth * 0.87,
    marginHorizontal: windowWidth * 0.2,
  },
  poin: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textJersey: {
    fontSize: 12,
    color: '#aeaeae',
    fontWeight: '600',
    fontFamily: 'Poppins-Reguler',
  },
  containerContent: {
    flexDirection: 'row',
    borderBottomColor: '#2632381A',
    borderBottomWidth: 1,
    paddingVertical: 16,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  textContent: {
    fontFamily: 'Poppins-Regular',
    marginLeft: 10,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 21,
    color: '#263238',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 1,
    marginVertical: 10,
    marginBottom: 50,
  },
  background: {
    // backgroundColor: '#51C091',
    height: windowHeight * 0.25,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    width: windowWidth * 0.88,

    // backgroundColor: '#51C091',
    borderWidth: 1,
    borderColor: '#51C091',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 20,
  },
  img: {
    borderRadius: 100,
    height: 60,
    width: 60,
  },
  content: {
    width: windowWidth * 0.9,
    height: 70,
    marginTop: -45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    marginHorizontal: 20,
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    // height: 80,
    width: 80,
    marginHorizontal: 3,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

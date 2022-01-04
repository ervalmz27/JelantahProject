import moment from 'moment';
import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {getDataCekJadwal} from '../../../Apis/api/cekjadwal';
import {useFocusEffect} from '@react-navigation/core';
import Header from '../../component/Header';
import AppLoader from '../../component/AppLoader';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const JadwalSetor = ({navigation}) => {
  const token = useSelector(state => state.users.login);
  const [navbar, setNavbar] = useState(false);
  const [tolak, setTolak] = useState(false);
  const [terima, setTerima] = useState(false);
  const [content, setContent] = useState('');
  const [jadwal, setJadwal] = useState([]);
  const [contentJadwal, setContentJadwal] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setNavbar(true);

      setContent('Terbaru');
      GetCekJadwal(token[0].id_token);
      const willFocusSubscription = navigation.addListener('focus', () => {
        setNavbar(true);

        setContent('Terbaru');
        GetCekJadwal(token[0].id_token);
      });

      return willFocusSubscription;
    }, []),
  );

  const GetCekJadwal = async id_token => {
    setLoading(true);
    const cekJadwal = await getDataCekJadwal(id_token);
    console.log('cekJadwal', cekJadwal.data.setoran);
    setJadwal(cekJadwal.data.setoran[0].terbaru);
    setContentJadwal(cekJadwal.data.setoran);
    setLoading(false);
  };

  return (
    <>
      <Header
        name="cek Jadwal"
        icon="chevron-left"
        onClick={() => navigation.goBack()}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: '#51C0911A',
        }}>
        <TouchableOpacity
          onPress={() => {
            setNavbar(!navbar);
            setTerima(false);
            setTolak(false);
            setContent('Terbaru');
          }}
          style={navbar == true ? styles.button : styles.defaultButton}>
          <Text style={navbar == true ? styles.textButton : styles.defaultText}>
            Terbaru
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTerima(!terima);
            setNavbar(false);
            setTolak(false);
            setContent('Diterima');
          }}
          style={terima == true ? styles.button : styles.defaultButton}>
          <Text style={terima == true ? styles.textButton : styles.defaultText}>
            Diterima
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setTolak(!tolak);
            setTerima(false);
            setNavbar(false);
            setContent('Ditolak');
          }}
          style={tolak == true ? styles.button : styles.defaultButton}>
          <Text style={tolak == true ? styles.textButton : styles.defaultText}>
            Ditolak
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {content == 'Terbaru' && jadwal.length > 0 ? (
          <>
            {jadwal.map((item, indx) => {
              return (
                <TouchableOpacity
                  key={indx}
                  style={styles.profile}
                  onPress={() => {
                    navigation.push('kodesetor', {detail: item});
                  }}>
                  <Image
                    source={require('../../../assets/Images/home/profile.jpg')}
                    style={styles.img}
                  />
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.nameProfile}>{item.judul}</Text>
                    <Text style={styles.message}>
                      {item.qty} {item.code_setoran}{' '}
                      {moment(item.tanggal).format('DD-MM-YYYY')} {item.jam}
                    </Text>
                    <Text style={styles.message}>
                      {moment(item.created_date).format('DD-MM-YYYY HH:mm:ss')}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </>
        ) : content == 'Terbaru' ? (
          <View style={styles.dummy}>
            <Text style={styles.textDummy}>Jadwal masih kosong!</Text>
          </View>
        ) : null}

        {content == 'Diterima' && contentJadwal[0].diterima > 0 ? (
          contentJadwal[0].diterima.map((item, indx) => {
            return (
              <TouchableOpacity
                key={indx}
                style={styles.profile}
                onPress={() => {
                  navigation.push('kodesetor', {detail: item});
                }}>
                <Image
                  source={require('../../../assets/Images/home/profile.jpg')}
                  style={styles.img}
                />
                <View style={{marginLeft: 10}}>
                  <Text style={styles.nameProfile}>{item.judul}</Text>
                  <Text style={styles.message}>
                    {item.qty} {item.code_setoran} {item.tanggal} {item.jam}
                  </Text>
                  <Text style={styles.message}>
                    {moment(item.created_date).format('DD-MM-YYYY HH:mm:ss')}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : content == 'Diterima' ? (
          <View style={styles.dummy}>
            <Text style={styles.textDummy}>Jadwal masih kosong!</Text>
          </View>
        ) : null}
        {content == 'Ditolak' && contentJadwal[0].ditolak.length > 0 ? (
          contentJadwal[0].ditolak.map((item, indx) => {
            return (
              <TouchableOpacity
                key={indx}
                style={styles.profile}
                onPress={() => {
                  navigation.push('kodesetor', {detail: item});
                }}>
                <Image
                  source={require('../../../assets/Images/home/profile.jpg')}
                  style={styles.img}
                />
                <View style={{marginLeft: 10}}>
                  <Text style={styles.nameProfile}>{item.judul}</Text>
                  <Text style={styles.message}>
                    {item.qty} {item.code_setoran} {item.tanggal} {item.jam}
                  </Text>
                  <Text style={styles.message}>
                    {moment(item.created_date).format('DD-MM-YYYY HH:mm:ss')}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : content == 'Ditolak' ? (
          <View style={styles.dummy}>
            <Text style={styles.textDummy}>Jadwal masih kosong!</Text>
          </View>
        ) : null}
      </ScrollView>
      {loading == true ? <AppLoader /> : null}
    </>
  );
};

export default JadwalSetor;

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Poppins-Light',
    fontWeight: '500',
    fontSize: 16,
    color: '#26323880',
  },
  textButton: {
    fontFamily: 'Poppins-Light',
    fontWeight: '500',
    fontSize: 16,
    color: '#51C091',
  },
  button: {
    borderBottomColor: '#51C091',
    borderBottomWidth: 1,
    width: windowWidth * 0.33,
    alignItems: 'center',
    padding: 13,
  },
  defaultButton: {
    width: windowWidth * 0.3,
    alignItems: 'center',
    padding: 13,
  },
  profile: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    marginHorizontal: 10,
  },
  img: {
    borderRadius: 100,
    height: 40,
    width: 40,
  },
  nameProfile: {
    fontFamily: 'Poppins-Regular',
    color: '#263238',
    fontSize: 14,
    fontWeight: '600',
  },
  message: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  dummy: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: windowHeight * 0.33,
  },
  textDummy: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

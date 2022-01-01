import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {getDataCekJadwal} from '../../../Apis/api/cekjadwal';
import Header from '../../component/Header';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const JadwalSetor = ({navigation}) => {
  const token = useSelector(state => state.users.login);
  const [navbar, setNavbar] = useState(false);
  const [tolak, setTolak] = useState(false);
  const [terima, setTerima] = useState(false);
  const [content, setContent] = useState('');
  const [jadwal, setJadwal] = useState([]);
  useEffect(() => {
    setNavbar(true);
    setContent('Terbaru');
    GetCekJadwal(token[0].id_token);
  }, []);

  const GetCekJadwal = async id_token => {
    const cekJadwal = await getDataCekJadwal(id_token);
    console.log('cekJadwal', cekJadwal.data.setoran[0].terbaru);
    setJadwal(cekJadwal.data.setoran[0].terbaru);
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
        {content == 'Terbaru' ? (
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
                      {item.qty} {item.code_setoran} {item.tanggal} {item.jam}
                    </Text>
                    <Text style={styles.message}>
                      {moment(item.created_date).format('DD-MM-YYYY HH:mm:ss')}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </>
        ) : null}

        {content == 'Diterima' ? (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text>Halaman Not Found!</Text>
          </View>
        ) : null}
        {content == 'Ditolak' ? (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text>Halaman Not Found!</Text>
          </View>
        ) : null}
      </ScrollView>
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
});

// export default JadwalSetor;

// const styles = StyleSheet.create({
//   defaultText: {
//     fontFamily: 'Poppins-Light',
//     fontWeight: '500',
//     fontSize: 16,
//     color: '#26323880',
//   },
//   textButton: {
//     fontFamily: 'Poppins-Light',
//     fontWeight: '500',
//     fontSize: 16,
//     color: '#51C091',
//   },
//   button: {
//     borderBottomColor: '#51C091',
//     borderBottomWidth: 1,
//     width: windowWidth * 0.5,
//     alignItems: 'center',
//     padding: 13,
//   },
//   defaultButton: {
//     width: windowWidth * 0.5,
//     alignItems: 'center',
//     padding: 13,
//   },
//   profile: {
//     paddingVertical: 15,
//     paddingHorizontal: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#EBEBEB',
//     marginHorizontal: 10,
//   },
//   img: {
//     borderRadius: 100,
//     height: 40,
//     width: 40,
//   },
//   nameProfile: {
//     fontFamily: 'Poppins-Regular',
//     color: '#263238',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   message: {
//     fontFamily: 'Poppins-Regular',
//     fontWeight: '600',
//     fontSize: 12,
//     letterSpacing: 0.5,
//   },
// });

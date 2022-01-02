import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {
  getDataCekJadwal,
  getDataTerimaJadwal,
} from '../../../Apis/api/cekjadwal';
import Header from '../../component/Header';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const TerimaJadwal = ({navigation}) => {
  const token = useSelector(state => state.users.login);
  const [navbar, setNavbar] = useState(false);
  const [tolak, setTolak] = useState(false);
  const [terima, setTerima] = useState(false);
  const [content, setContent] = useState('');
  const [terbaru, setTerbaru] = useState([]);

  useEffect(() => {
    setNavbar(true);
    setContent('Terbaru');
    fetchTerimaJadwal(token[0].id_token);
  }, []);

  const fetchTerimaJadwal = async id_token => {
    const Response = await getDataTerimaJadwal(id_token);
    console.log('Response', Response.data.setoran[0].terbaru);
    setTerbaru(Response.data.setoran[0].terbaru);
  };
  return (
    <>
      <Header
        name="Terima Jadwal"
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
        {content == 'Terbaru' && terbaru.length > 0 ? (
          <>
            {terbaru.map((item, idx) => {
              return (
                <TouchableOpacity
                  key={idx}
                  style={styles.profile}
                  onPress={() => {
                    navigation.push('detailJadwal', {detail: item});
                  }}>
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.nameProfile}>{item.judul}</Text>
                    <Text style={styles.message} numberOfLines={1}>
                      {item.qty} {item.jenis_limbah} {item.tanggal}
                    </Text>
                    <Text style={styles.message} numberOfLines={1}>
                      {moment(item.created_date).format('DD-MM-YYYY HH:mm:ss')}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </>
        ) : (
          <View style={styles.dummy}>
            <Text style={styles.textDummy}>Jadwal masih kosong!</Text>
          </View>
        )}

        {content == 'Diterima' ? (
          <View style={styles.dummy}>
            <Text style={styles.textDummy}>Jadwal masih kosong!</Text>
          </View>
        ) : null}
        {content == 'Ditolak' ? (
          <View style={styles.dummy}>
            <Text style={styles.textDummy}>Jadwal masih kosong!</Text>
          </View>
        ) : null}
      </ScrollView>
    </>
  );
};

export default TerimaJadwal;

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

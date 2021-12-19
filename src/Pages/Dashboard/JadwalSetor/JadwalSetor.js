import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../component/Header';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const JadwalSetor = ({navigation}) => {
  const [navbar, setNavbar] = useState(false);
  const [tolak, setTolak] = useState(false);
  const [terima, setTerima] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    setTerima(true);
    setContent('Diterima');
  }, []);

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
          //   justifyContent: 'space-around',
          backgroundColor: '#51C0911A',
        }}>
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
        {content == 'Diterima' ? (
          <>
            <TouchableOpacity
              style={styles.profile}
              onPress={() => {
                navigation.navigate('detailsetor');
              }}>
              <Image
                source={require('../../../assets/Images/home/profile.jpg')}
                style={styles.img}
              />
              <View style={{marginLeft: 10}}>
                <Text style={styles.nameProfile}>Mitra RW 007</Text>
                <Text style={styles.message}>
                  Setor 10 KG Limbah Minyak Jelantah
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profile}>
              <Image
                source={require('../../../assets/Images/home/profil1.png')}
                style={styles.img}
              />
              <View style={{marginLeft: 10}}>
                <Text style={styles.nameProfile}>Mitra RW 007</Text>
                <Text style={styles.message}>
                  Setor 2 KG Limbah Minyak Jelantah
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profile}>
              <Image
                source={require('../../../assets/Images/home/profile.jpg')}
                style={styles.img}
              />
              <View style={{marginLeft: 10}}>
                <Text style={styles.nameProfile}>Mitra RW 007</Text>
                <Text style={styles.message}>
                  Setor 50 KG Limbah Minyak Jelantah
                </Text>
              </View>
            </TouchableOpacity>
          </>
        ) : null}

        {content == 'Ditolak' ? (
          <TouchableOpacity
            style={styles.profile}
            onPress={() => {
              //    navigation.navigate('detailJadwal');
            }}>
            <Image
              source={require('../../../assets/Images/home/profile.jpg')}
              style={styles.img}
            />
            <View style={{marginLeft: 10}}>
              <Text style={styles.nameProfile}>Mitra RW 007</Text>
              <Text style={styles.message}>
                Setor 10 KG Limbah Minyak Jelantah
              </Text>
            </View>
          </TouchableOpacity>
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
    width: windowWidth * 0.5,
    alignItems: 'center',
    padding: 13,
  },
  defaultButton: {
    width: windowWidth * 0.5,
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
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0.5,
  },
});

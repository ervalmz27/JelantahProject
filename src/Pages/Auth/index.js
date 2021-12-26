import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {getUsersRequest} from '../../Apis/actions/users';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Auth = ({navigation, props, users}) => {
  const globalState = useSelector(state => state);
  const [status, setStatus] = useState(false);
  console.log('-----', users.items);
  const [Login, setLogin] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setLogin({...Login, username: '', password: ''});
  }, []);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView>
        <ScrollView>
          <View style={{height: windowHeight * 0.4}}>
            <Swiper
              autoplay={true}
              autoplayTimeout={2.5}
              showsButtons={false}
              showsPagination={false}>
              <View
                style={{
                  backgroundColor: 'rgba(119, 189, 30, 0.3)',
                  height: windowHeight * 0.4,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={styles.imagg}
                  source={require('../../assets/Images/home/goGreen.png')}
                />
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(81, 192, 145, 0.3)',
                  height: windowHeight * 0.4,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={styles.imagg}
                  source={require('../../assets/Images/home/Mitra.png')}
                />
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(253, 230, 125, 0.3)',
                  height: windowHeight * 0.4,
                }}>
                <Image
                  style={styles.imagg}
                  source={require('../../assets/Images/home/cuan.png')}
                />
              </View>
            </Swiper>
          </View>
          <View style={styles.card}>
            <Swiper
              autoplay={true}
              autoplayTimeout={2.5}
              style={{
                height: windowHeight * 0.4,
                margin: 20,
              }}
              activeDotColor="#51C091"
              showsButtons={false}
              showsPagination={true}>
              <View>
                <View style={styles.betwen}>
                  <Text style={styles.header}>Go Green with</Text>
                  <Text style={[styles.limbah, {width: windowWidth * 0.534}]}>
                    Jelanta
                  </Text>
                </View>
                <View style={styles.content}>
                  <Text style={[styles.textConten, {width: 330}]}>
                    Limbah Minyak Goreng (Jelantah) merusak kelestarian
                    lingkungan dan kesehatan manusia jika tidak dikelola secara
                    baik(profesional, sistematis, sinergis dan terbuka)
                  </Text>
                </View>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.header}>Mitra </Text>
                  <Text
                    style={[
                      styles.limbah,
                      {width: windowWidth * 0.69, marginLeft: 20},
                    ]}>
                    Multi-Pihak
                  </Text>
                </View>
                <View style={styles.content}>
                  <Text style={styles.textConten}>
                    Membangun kemitraan bersama dengan pemerintah, korporasi,
                    dan masyarakat
                  </Text>
                </View>
              </View>
              <View>
                <View style={styles.betwen}>
                  <Text style={styles.header}>Bisa dapat </Text>
                  <Text style={[styles.limbah, {width: 218}]}>
                    Cuan dari Limbah?
                  </Text>
                </View>
                <View style={styles.content}>
                  <Text style={[styles.textConten]}>
                    Sekarang limbah minyak jelantah bisa kamu jadikan cuan.
                    Cukup gabung menjadi Mitra Jelanta.ID
                  </Text>
                </View>
              </View>
            </Swiper>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Loginscreen');
            }}>
            <Text style={[styles.fontReguler, {color: '#fff'}]}>Masuk</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonOutlin}
            onPress={() => {
              navigation.navigate('Registerscreen');
            }}>
            <Text style={[styles.fontReguler, {color: '#51C091'}]}>
              Gabung Sekarang
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

// export default Auth;
export default connect(({users}) => ({users}), {
  getUsersRequest,
})(Auth);

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', padding: 24},
  card: {height: windowHeight * 0.4},
  imagg: {},
  betwen: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  header: {fontSize: 18, color: '#51C091', fontFamily: 'Poppins-Regular'},
  limbah: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    backgroundColor: '#51C091',
    marginLeft: 10,
    padding: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: 175,
  },
  content: {
    marginTop: 15,
    marginHorizontal: -15,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  textConten: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  text: {fontFamily: 'Lato-Bold', color: '#000', fontSize: 18},
  button: {
    backgroundColor: '#51C091',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 16,
  },
  buttonOutlin: {
    borderWidth: 1,
    borderColor: '#51C091',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 16,
  },
  textButton: {
    fontFamily: 'Lato-Bold',
    color: '#fff',
    fontSize: 18,
  },

  fontReguler: {
    fontFamily: 'Poppins-Regular',
  },
});

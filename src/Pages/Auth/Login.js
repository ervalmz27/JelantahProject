import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  StatusBar,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {API_URL} from '../../config/env';
import Header from '../component/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {getLoginUsers, getUsersSuccess} from '../../Apis/actions/users';
import AppLoader from '../component/AppLoader';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Login = ({navigation}) => {
  const jsonValue = AsyncStorage.getItem('token');
  const [loadingPending, setLoadingPending] = useState(false);
  const globalState = useSelector(state => state);
  // console.log('sssss', globalState);
  const dispatch = useDispatch();
  const [security, setSecurity] = useState(true);
  const [form, setForm] = useState({
    user_id: '',
    user_password: '',
  });
  const handleBack = () => {
    navigation.goBack();
  };
  const postLogin = async (user_id, user_password) => {
    setLoadingPending(true);
    try {
      AsyncStorage.setItem('user_id', user_id);
      AsyncStorage.setItem('user_password', user_password);
      const data = {
        user_id: user_id,
        user_password: user_password,
      };

      await axios
        .post(`${API_URL}act_loginAndroid.php`, data)
        .then(res => {
          dispatch(getLoginUsers(res.data.data));
          res.data.data.forEach(res => {
            const mitra = res.user_level_nama;
            dispatch(getUsersSuccess(mitra));
            if (
              res.msg != 'userid not found' &&
              res.msg != 'password incorrect'
            ) {
              AsyncStorage.setItem('token', res.id_token);
              navigation.navigate('Home');
              setLoadingPending(false);
            } else {
              alert('Username/Password Tidak Ditemukan');
            }
          });
        })
        .catch(err => {
          setLoadingPending(false);
          console.log('error', err);
        });
    } catch (error) {
      setLoadingPending(false);
      console.log('Message Error : ', error);
      alert(
        'Username atau Password Yang Anda Masukan Tidak Terdapat Mohon Dicheck Kembali',
      );
    }
  };
  const handleLogin = (user_id, user_password) => {
    postLogin(user_id, user_password);
  };
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <Header
        icon={'chevron-left'}
        name={'Masuk'}
        onClick={() => handleBack()}
      />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.textHeader}>
            Masuk dengan akun yang terdaftar!
          </Text>
        </View>
        <View style={styles.container}>
          <Icon
            name="user-alt"
            size={15}
            color="#51C091"
            style={{marginLeft: 10}}
          />
          <TextInput
            placeholder="Email atau Nomor HP"
            style={styles.input}
            value={form.user_id}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={e => {
              setForm({...form, user_id: e.toLowerCase()});
            }}
          />
        </View>
        <View style={[styles.container, {justifyContent: 'space-between'}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="lock"
              size={15}
              color="#51C091"
              style={{marginLeft: 10}}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              value={form.user_password}
              secureTextEntry={security}
              onChangeText={p => {
                setForm({...form, user_password: p});
              }}
            />
          </View>
          {security == true ? (
            <TouchableOpacity
              onPress={() => {
                setSecurity(!security);
              }}>
              <Icon
                name="eye-slash"
                size={15}
                color="#51C091"
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setSecurity(!security);
              }}>
              <Icon
                name="eye"
                size={15}
                color="#51C091"
                style={{marginLeft: 10}}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.lupas}
          onPress={() => navigation.navigate('LupaPassword')}>
          <Text style={[styles.textHeader, {color: '#51C091'}]}>
            Lupa Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (form.user_id != '' && form.user_password != '') {
              postLogin(form.user_id, form.user_password);
            } else {
              Alert.alert('Data Belum Diisi!');
            }
          }}>
          <Text style={[styles.fontReguler, {color: '#fff'}]}>Masuk</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text>Belum punya akun?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Registerscreen')}>
            <Text
              style={[styles.fontReguler, {color: '#51C091', marginLeft: 5}]}>
              Daftar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loadingPending == true ? <AppLoader /> : null}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  fontReguler: {
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#51C091',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 20,
  },
  textHeader: {
    fontFamily: 'Poppins-Bold',
    color: '#455A6480',
  },
  input: {
    fontFamily: 'Poppins-Reguler',
    color: '#010101',
    padding: 10,
    marginLeft: 5,
    width: windowWidth * 0.6,
  },
  container: {
    marginHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#51C091',
    alignItems: 'center',
  },
  lupas: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    margin: 10,
  },
});

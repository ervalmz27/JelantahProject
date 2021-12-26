import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header';
import Shield from '../../../assets/Images/Icon/shield.svg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import {verifikasiPassword} from '../../../Apis/api/akun';
import {useSelector} from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ChangePassword = ({navigation}) => {
  const state = useSelector(state => state.users.login);

  const [security, setSecurity] = useState(true);
  const [password, setPassword] = useState('');
  const [tokent, setTokent] = useState('');
  const [msg, setMsg] = useState(null);
  const [disable, setDisable] = useState(true);
  const [secur, setSecur] = useState(false);
  useEffect(() => {
    state.forEach(el => {
      setTokent(el.id_token);
    });
  }, []);
  const verification = async (id_token, user_password) => {
    const Response = await verifikasiPassword(id_token, user_password);
    console.log('Response----->', Response.data.data);
    if (Response.data.data != undefined) {
      Response.data.data.forEach(el => {
        setMsg(el.msg);
        if (el.msg == 'Password benar') {
          navigation.push('ubahkatasandi', {token: tokent});
        } else {
          setSecur(true);
        }
      });
    }
  };
  return (
    <>
      <Header
        name="Verifikasi Keamanan"
        icon="chevron-left"
        onClick={() => navigation.goBack()}
      />

      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Shield />
        </View>
        <View style={{marginHorizontal: 20, marginTop: 28}}>
          <Text style={{textAlign: 'left'}}>
            Harap masukkan password kamu demi terjaganya keamanan akun
          </Text>
        </View>
        <View style={{marginHorizontal: 20, marginBottom: -10, marginTop: 15}}>
          <Text style={secur ? styles.textlose : styles.textdefault}>
            Password Saat Ini
          </Text>
        </View>
        <View
          style={
            secur
              ? [styles.notsecur, {justifyContent: 'space-between'}]
              : [styles.container, {justifyContent: 'space-between'}]
          }>
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
              value={password}
              secureTextEntry={security}
              onChangeText={p => {
                setPassword(p);
                setDisable(false);
                setSecur(false);
                if (p.length == 0) {
                  setDisable(true);
                }
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
        <View style={{padding: 20}}>
          <Text>{msg}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        disabled={disable}
        style={disable ? styles.disable : styles.Button}
        onPress={() => {
          verification(tokent, password);
        }}>
        <Text style={[styles.fontReguler, {color: '#fff'}]}>Verifikasi</Text>
      </TouchableOpacity>
    </>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  textdefault: {fontFamily: 'Poppins-Regular', fontSize: 14},
  textlose: {fontFamily: 'Poppins-Regular', fontSize: 14, color: '#F44336'},
  container: {
    marginHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#51C091',
    alignItems: 'center',
  },
  notsecur: {
    marginHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F44336',
    alignItems: 'center',
  },
  input: {
    fontFamily: 'Poppins-Reguler',
    color: '#010101',
    padding: 10,
    marginLeft: 5,
    width: windowWidth * 0.6,
  },
  disable: {
    height: 48,
    backgroundColor: '#51C09180',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  Button: {
    height: 48,
    backgroundColor: '#51C091',
    borderRadius: 10,
    alignItems: 'center',
    margin: 16,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

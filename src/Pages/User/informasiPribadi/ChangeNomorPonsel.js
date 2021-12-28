import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../component/Header';
import Shield from '../../../assets/Images/Icon/shield.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {OtpEmail} from '../../../Apis/api/akun/profile';
const ChangeNomorPonsel = ({navigation}) => {
  const state = useSelector(state => state.users.login);
  console.log(state);

  const getOtp = async user_email => {
    console.log(user_email);
    const Response = await OtpEmail(user_email);
    console.log('Response ---->', Response.data.data);
    const valid = Response.data.data;
    if (valid[0].status == 'success') {
      navigation.push('VerifHp', {gmail: state[0].user_email});
    } else {
      alert(valid[0].msg);
    }
  };
  return (
    <>
      <Header
        name="Verifikasi Keamanan"
        icon="chevron-left"
        onClick={() => navigation.goBack()}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Shield />
      </View>
      <View style={{padding: 20}}>
        <Text style={styles.textContent}>
          Untuk melindungi keamanan akun kamu, kami perlu memverifikasi
          identitas kamu
        </Text>
      </View>
      <View>
        <Text style={styles.textTitle}>Pilih metode untuk verifikasi :</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          getOtp(state[0].user_email);
        }}>
        <Icon
          name="envelope"
          size={20}
          color="#C7C7C7"
          style={{marginRight: 10}}
        />
        <Text style={styles.verif}>Verifikasi Melalui Email</Text>
      </TouchableOpacity>
    </>
  );
};

export default ChangeNomorPonsel;

const styles = StyleSheet.create({
  textContent: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  verif: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 14,
  },
  button: {
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

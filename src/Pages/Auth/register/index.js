import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../component/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Cupon from '../../../assets/Images/cupon.svg';

import axios from 'axios';
import {API_URL} from '../../../config/env';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Register = ({navigation}) => {
  const [security, setSecurity] = useState(true);
  const [rege, setRegex] = useState(false);
  const [form, setForm] = useState({
    user_fullname: '',
    user_email: '',
    user_nohp: '',
    user_password: '',
    code_ref: null,
  });
  console.log(form);
  const handleBack = () => {
    navigation.goBack();
  };
  const regex = event => {
    console.log('===========', event);
    const nameRegex =
      /^(\()?(08)(\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/;

    if (nameRegex.test(event)) {
      setForm({...form, user_nohp: event});
      console.log('----', event);
      return true;
    } else {
      setForm({...form, user_nohp: event});
      return false;
    }
  };
  const validateEmail = text => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      setForm({...form, user_email: text});
      return false;
    } else {
      setForm({...form, user_email: text});
      console.log('Email is Correct');
    }
  };
  const Register = async (
    user_fullname,
    user_email,
    user_nohp,
    user_password,
    code_ref,
  ) => {
    try {
      const data = {
        user_fullname: user_fullname,
        user_email: user_email,
        user_nohp: user_nohp,
        user_password: user_password,
        code_ref: code_ref,
      };
      const Response = await axios
        .post(`${API_URL}act_reguserAndroidPersonal.php`, data)
        .then(res => {
          console.log('Response ,', res.data.data);
          const condisi = res.data.data;
          condisi.forEach(el => {
            if (
              form.user_email != '' &&
              form.user_fullname != '' &&
              form.user_nohp != '' &&
              form.user_password != '' &&
              el.status != 'failed'
            ) {
              navigation.navigate('Loginscreen');
            } else {
              alert(el.msg);
            }
          });

          setForm({
            ...form,
            user_email: '',
            user_fullname: '',
            user_nohp: '',
            user_password: '',
            code_ref: '',
          });
          return Response;
        })
        .catch(err => {
          console.log(err.response.data);
        });
    } catch (error) {
      console.log('Message Error : ', error);
    }
  };
  return (
    <>
      <Header
        icon={'chevron-left'}
        name={'Daftar'}
        onClick={() => handleBack()}
      />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.textHeader}>
            Gabung sekarang menjadi Mitra Personal kami!
          </Text>
        </View>

        {/* username */}
        <View style={styles.container}>
          <Icon
            name="user-alt"
            size={15}
            color="#51C091"
            style={{marginLeft: 10}}
          />
          <TextInput
            placeholder="Nama Lengkap"
            style={styles.input}
            value={form.user_fullname}
            onChangeText={e => {
              setForm({...form, user_fullname: e});
            }}
          />
        </View>
        {/* endusernamme */}
        {/* Email */}
        <View style={styles.container}>
          <Icon name="at" size={15} color="#51C091" style={{marginLeft: 10}} />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={styles.input}
            value={form.user_email}
            onChangeText={mail => {
              validateEmail(mail);
            }}
          />
        </View>
        {/* endEmail */}
        {/* Nomor Handphon */}
        <View style={styles.container}>
          <Icon
            name="phone"
            size={15}
            color="#51C091"
            style={{marginLeft: 10}}
          />
          <TextInput
            placeholder="Nomor HP (Whatsapp)"
            style={styles.input}
            keyboardType="numeric"
            value={form.user_nohp}
            onChangeText={no => {
              // setForm({...form, user_nohp: no});
              regex(no);
            }}
            maxLength={14}
          />
        </View>
        {/* end Nomor Handphon */}
        {/* password */}
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
        {/* end Pasword */}
        {/* kupon */}

        <View style={styles.container}>
          <View style={{marginLeft: 10}}>
            <Cupon height={18} width={18} />
          </View>
          <TextInput
            placeholder="Kode Referral (opsional)"
            style={styles.input}
            value={form.code_ref}
            onChangeText={code => {
              setForm({...form, code_ref: code});
            }}
          />
        </View>
        {/* end Kupon*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (
              form.user_fullname != '' &&
              form.user_email != '' &&
              form.user_nohp != '' &&
              form.user_password != ''
            ) {
              Register(
                form.user_fullname.toLowerCase(),
                form.user_email.toLowerCase(),
                form.user_nohp,
                form.user_password.toLowerCase(),
                form.code_ref,
              );
            } else {
              alert('periksa lagi format yang anda masukan!');
            }
          }}>
          <Text style={[styles.fontReguler, {color: '#fff'}]}>Daftar</Text>
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.fontReguler}>atau gabung sebagai</Text>
        </View>

        <TouchableOpacity
          style={styles.buttonOutlin}
          onPress={() => {
            navigation.navigate('MitraUsaha');
          }}>
          <Text
            style={[
              styles.fontReguler,
              {color: '#51C091', marginLeft: 5, fontWeight: '600'},
            ]}>
            Mitra Usaha
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonOutlin}
          onPress={() => {
            navigation.navigate('MitraLembaga');
          }}>
          <Text
            style={[
              styles.fontReguler,
              {color: '#51C091', marginLeft: 5, fontWeight: '600'},
            ]}>
            Mitra Lembaga
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text>Sudah punya akun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Loginscreen')}>
            <Text
              style={[styles.fontReguler, {color: '#51C091', marginLeft: 5}]}>
              Masuk
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: 'flex-start',
    width: windowWidth * 0.8,
  },
  textHeader: {
    fontFamily: 'Poppins-Bold',
    color: '#455A6480',
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#51C091',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 20,
    marginTop: 15,
    marginLeft: 20,
  },
  input: {
    fontFamily: 'Poppins-Reguler',
    color: '#010101',
    padding: 10,
    marginLeft: 5,
    width: windowWidth * 0.7,
  },
  container: {
    marginHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#51C091',
    alignItems: 'center',
  },
  fontReguler: {
    fontFamily: 'Poppins-Regular',
  },
  buttonOutlin: {
    borderWidth: 1,
    borderColor: '#51C091',
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
});

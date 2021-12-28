import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {editHP} from '../../../Apis/api/akun/profile';
import Header from '../../component/Header';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const KelolaNoomorHP = ({navigation}) => {
  const state = useSelector(state => state.users.login);
  const [nomor, setNomor] = useState('');

  const change_no_HP = async (id_token, no_hp) => {
    const Response = await editHP(id_token, no_hp);
    console.log('Response', Response.data);
    navigation.navigate('User');
  };

  return (
    <>
      <Header
        name="Kelola Nomor HP"
        icon="chevron-left"
        onClick={() => navigation.goBack()}
      />
      <View style={{padding: 20}}>
        <Text style={styles.title}>Silakan kamu masukkan nomor HP barumu</Text>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <Text
          style={[
            styles.title,
            {fontFamily: 'Poppins-SemiBold', fontWeight: '600'},
          ]}>
          Nomor HP
        </Text>
        <TextInput
          placeholder="081299677321"
          style={styles.input}
          value={nomor}
          onChangeText={a => setNomor(a)}
          onSubmitEditing={() => {
            change_no_HP(state[0].id_token);
          }}
        />
      </View>
      <View style={{marginTop: windowHeight * 0.5}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            change_no_HP(state[0].id_token);
          }}>
          <Text style={styles.text}>Verifikasi</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default KelolaNoomorHP;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: 24,
    marginTop: 24,
  },
  input: {
    borderBottomColor: '#51C091',
    borderBottomWidth: 1,
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    textAlignVertical: 'center',
  },
  button: {
    height: 48,
    backgroundColor: '#51C091',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});

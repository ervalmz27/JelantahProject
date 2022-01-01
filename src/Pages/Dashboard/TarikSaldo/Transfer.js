import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {getWidraw} from '../../../Apis/api/Tariksaldo';
import {IMAGE_URL} from '../../../config/env';
import Header from '../../component/Header';

const Transfer = ({navigation, route}) => {
  const token = useSelector(state => state.users.login);
  const {rekening, wallet} = route.params;
  console.log('rekening,wallet --->', rekening, wallet);
  const [disable, setDisable] = useState(true);
  const [nominal, setNominal] = useState(0);

  const Widraw = async (
    id_token,
    jumlah_withdraw,
    isBankOrDgm,
    idBankOrDgm,
  ) => {
    const widraw = await getWidraw(
      id_token,
      jumlah_withdraw,
      isBankOrDgm,
      idBankOrDgm,
    );
    console.log('Response ------> ', widraw.data);
    if (widraw.data.informasi[0].status == 'success') {
      navigation.navigate('HomeScreen');
    }
  };
  return (
    <>
      <Header
        name="Transfer ke Bank"
        icon="chevron-left"
        onClick={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={{padding: 20}}>
          <Text style={styles.text}>Transfer ke Rekening</Text>
        </View>
        {wallet != null ? (
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              alignItems: 'center',
            }}>
            <Image
              style={{height: 50, width: 50}}
              source={{
                uri: IMAGE_URL + wallet.logo_ewallet,
              }}
            />
            <View>
              <Text
                style={[
                  styles.title,
                  {fontSize: 14, fontWeight: '500', marginLeft: 10},
                ]}>
                {wallet.nama_di_dgm}
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: 10,
                    fontWeight: '500',
                    marginLeft: 10,
                    letterSpacing: 0.5,
                  },
                ]}>
                {wallet.nama_ewallet}.{wallet.nomor_dgm}
              </Text>
            </View>
          </View>
        ) : null}
        {rekening != null ? (
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              alignItems: 'center',
            }}>
            <Image
              style={{height: 50, width: 50}}
              source={{
                uri: IMAGE_URL + rekening.logo_bank,
              }}
            />
            <View>
              <Text
                style={[
                  styles.title,
                  {fontSize: 14, fontWeight: '500', marginLeft: 10},
                ]}>
                {rekening.nama_di_rek}
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: 10,
                    fontWeight: '500',
                    marginLeft: 10,
                    letterSpacing: 0.5,
                  },
                ]}>
                {rekening.nama_bank}.{rekening.nomor_rek}
              </Text>
            </View>
          </View>
        ) : null}
        <View style={{padding: 20}}>
          <Text style={styles.text}>Nominal Transfer</Text>
          <TextInput
            placeholder="Rp. 0"
            style={styles.input}
            keyboardType="numeric"
            value={nominal}
            onChangeText={a => {
              setNominal(a);
              setDisable(true);
              if (a >= 10000) {
                setDisable(false);
              }
            }}
          />
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            {nominal >= 20000 ? (
              <>
                <Icon name="check-circle" size={10} color="#51C091" />
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 10,
                    color: '#51C091',
                    marginLeft: 5,
                  }}>
                  Saldo Cukup
                </Text>
              </>
            ) : (
              <>
                <Icon name="exclamation-circle" size={10} color="#F1B104" />
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 10,
                    color: '#F1B104',
                    marginLeft: 5,
                  }}>
                  Minimal transfer Rp 20.000
                </Text>
              </>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={{padding: 20}}>
        <TouchableOpacity
          style={disable ? styles.disable : styles.Button}
          disabled={disable}
          onPress={() => {
            if (rekening != null) {
              Widraw(
                token[0].id_token,
                nominal,
                rekening.id_bank,
                rekening.id_user_bank,
              );
            } else if (wallet != null) {
              Widraw(
                token[0].id_token,
                nominal,
                rekening.id_dgm,
                rekening.id_user_dgm,
              );
            } else {
              alert('data tidak ditemukan!');
            }
          }}>
          <Text
            style={{color: '#fff', fontSize: 14, fontFamily: 'Poppins-Bold'}}>
            Tarik Saldo
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Transfer;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    color: '#263238',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontStyle: 'normal',
    fontSize: 16,
    color: '#263238',
  },
  Button: {
    height: 48,
    backgroundColor: '#51C091',
    borderRadius: 10,
    alignItems: 'center',
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
  disable: {
    height: 48,
    backgroundColor: '#51C09180',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomColor: '#51C091',
    borderBottomWidth: 1,
  },
});

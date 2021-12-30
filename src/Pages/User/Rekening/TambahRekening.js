import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Switch,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../component/Header';

import Success from '../../../assets/Images/Icon/success.svg';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {RegisterEwalet} from '../../../Apis/api/akun/Ewalet';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import {ScrollView} from 'react-native-gesture-handler';
import {IMAGE_URL} from '../../../config/env';
import {useSelector} from 'react-redux';
import {getDataBank, RegisterRekBank} from '../../../Apis/api/akun/bank';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TambahRekening = ({navigation}) => {
  const users = useSelector(state => state.users.login);
  console.log(users[0].id_token);
  const [ShowComment, setShowModelComment] = useState(false);
  const [animateModal, setanimateModal] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setAkunUtama(1);
  };
  const [nameWalet, setNameWalet] = useState('Nama Bank');
  const [dataDgm, setDgm] = useState([]);
  const [namePemilik, setNamePemilik] = useState('');
  const [nomorPonsel, setNomorPonsel] = useState('');
  const [Img, setImg] = useState(null);
  const [akunUtama, setAkunUtama] = useState(0);
  const [succes, setSucces] = useState(false);
  const [idDgm, setIdDgm] = useState('');
  const [back, setBack] = useState(false);
  useEffect(() => {
    Digital();
  }, []);
  const Digital = useCallback(async () => {
    const Response = await getDataBank();
    console.log(Response.data);
    setDgm(Response.data.bank);
  }, []);

  const Create = async (
    id_token,
    nama_rekening,
    no_rekening,
    id_bank,
    isAkunUtama,
  ) => {
    const Response = await RegisterRekBank(
      id_token,
      nama_rekening,
      no_rekening,
      id_bank,
      isAkunUtama,
    );
    console.log('Response ---> ', Response.data);

    if (Response.data.informasi[0].status != 'failed') {
      setSucces(true);
      setBack(true);
      setTimeout(() => {
        setSucces(false);
      }, 2000);
    }
  };
  return (
    <>
      <Header
        name="Tambah Rekening Bank"
        icon="chevron-left"
        onClick={() => {
          navigation.goBack();
        }}
      />

      <SafeAreaView style={{backgroundColor: '#fff', height: windowHeight * 1}}>
        {succes == true ? (
          <View style={styles.popup}>
            <Success height={20} width={20} />
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontWeight: '700',
                color: '#fff',
                marginLeft: 20,
              }}>
              Rekening kamu berhasil ditambahkan
            </Text>
          </View>
        ) : null}

        <View style={{marginHorizontal: 20}}>
          <Text style={styles.judul}>Identitas Pemilik Rekening</Text>
        </View>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Nama Lengkap Pemilik Rekening"
            value={namePemilik}
            onChangeText={p => {
              setNamePemilik(p);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="No. Rekening"
            keyboardType="number-pad"
            value={nomorPonsel}
            onChangeText={no => {
              setNomorPonsel(no);
            }}
          />
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowModelComment(true)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {Img != null ? (
                <Image
                  style={{height: 32, width: 32, marginRight: 10}}
                  source={{
                    uri: IMAGE_URL + Img,
                  }}
                />
              ) : null}

              <Text>{nameWalet}</Text>
            </View>

            <Icon name="chevron-down" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontWeight: '600',
              fontSize: 16,
              textAlign: 'left',
              width: 150,
              color: '#263238',
            }}>
            Jadikan sebagai rekening utama
          </Text>
          <Switch
            trackColor={{false: '#00837533', true: '#008375'}}
            thumbColor={isEnabled ? '#51C091' : '#FFFFFF'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        {back == false ? (
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              Create(
                users[0].id_token,
                namePemilik,
                nomorPonsel,
                idDgm,
                akunUtama,
              );
            }}>
            <Text style={styles.textButton}>Simpan Rekening</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              navigation.navigate('User');
              setBack(false);
            }}>
            <Text style={styles.textButton}>Kembali</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>

      <SwipeUpDownModal
        modalVisible={ShowComment}
        PressToanimate={animateModal}
        //if you don't pass HeaderContent you should pass marginTop in view of ContentModel to Make modal swipeable
        ContentModal={
          <>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderBottomColor: '#51C091',
                  borderBottomWidth: 4,
                  marginTop: 10,
                  width: 40,
                }}
              />
            </View>
            <ScrollView>
              {dataDgm.map((item, idx) => {
                return (
                  <>
                    <TouchableOpacity
                      key={idx}
                      style={styles.content}
                      onPress={() => {
                        setNameWalet(item.bank_nama);
                        setShowModelComment(false);
                        setanimateModal(false);
                        setImg(item.bank_logo);
                        setIdDgm(item.bank_id);
                      }}>
                      <Image
                        style={{height: 50, width: 50}}
                        source={{
                          uri: IMAGE_URL + item.bank_logo,
                        }}
                      />
                      <Text
                        style={[
                          styles.title,
                          {fontSize: 16, fontWeight: '500', marginLeft: 10},
                        ]}>
                        {item.bank_nama}
                      </Text>
                    </TouchableOpacity>
                  </>
                );
              })}
            </ScrollView>
          </>
        }
        ContentModalStyle={styles.Modal}
        onClose={() => {
          setShowModelComment(false);
          setanimateModal(false);
        }}
      />
    </>
  );
};

export default TambahRekening;

const styles = StyleSheet.create({
  judul: {
    fontFamily: 'Poppins-SemiBold',
    color: '#263238',
    fontSize: 16,
  },
  popup: {
    marginTop: -20,
    marginBottom: 10,
    backgroundColor: '#51C091',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 5,
    padding: 14,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#51C091',
  },
  dropdown: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#51C091',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: windowHeight * 0.25,
  },
  garis: {
    borderTopWidth: 4,
    borderTopColor: '#26323833',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    marginHorizontal: 135,
  },
  content: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: '#51C091',
    borderBottomWidth: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  Button: {
    backgroundColor: '#51C091',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 20,
    marginTop: windowHeight * 0.35,
    height: 50,
  },
  textButton: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  //   modalll

  Modal: {
    backgroundColor: '#fff',
    marginTop: windowHeight * 0.5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontStyle: 'normal',
    fontSize: 16,
    color: '#263238',
  },
});

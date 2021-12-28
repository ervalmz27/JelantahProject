import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Modal} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {
  AkunUtamaEWallet,
  DeleteEwalet,
  getDataEWallet,
} from '../../../Apis/api/akun/Ewalet';
import {IMAGE_URL} from '../../../config/env';
import Header from '../../component/Header';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Ewalet = ({navigation}) => {
  const login = useSelector(state => state.users.login);
  const [data, setData] = useState();
  const [refreshInterval, setRefreshInterval] = useState(refreshInterval || 0);
  const [dataWallet, setDataWallet] = useState([]);
  const [visible, setVisible] = useState(false);
  const [utama, setUtama] = useState('');
  const [deleteData, setDeleteData] = useState('');
  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(Walet, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);
  useEffect(() => {
    login.forEach(el => {
      Walet(el.id_token);
      const willFocusSubscription = navigation.addListener('focus', () => {
        Walet(el.id_token);
      });

      return willFocusSubscription;
    });
  }, []);
  const Walet = useCallback(
    async id_token => {
      const Response = await getDataEWallet(id_token);
      console.log('Response ---> ', Response.data.ewallet);
      setDataWallet(Response.data.ewallet);
    },
    [dataWallet],
  );

  const Delete = async (id_token, id_user_dgm) => {
    const Response = await DeleteEwalet(id_token, id_user_dgm);
    console.log('Response --- > ', Response.data);
    Walet(login[0].id_token);
    setVisible(false);
  };
  const ChangeUtama = async (id_token, id_dgm) => {
    const Response = await AkunUtamaEWallet(id_token, id_dgm);
    console.log('Response --->', Response.data);
    Walet(login[0].id_token);
    setVisible(false);
  };
  console.log(utama);
  return (
    <>
      <Header
        name="E-Wallet"
        icon="chevron-left"
        onClick={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        style={{
          backgroundColor: '#fff',
          height: windowHeight * 1,
        }}>
        <TouchableOpacity
          style={[styles.button, {marginTop: 20}]}
          onPress={() => {
            navigation.navigate('Tambahwalet');
          }}>
          <Icon name="plus" size={12} style={{marginRight: 10}} />
          <Text style={styles.textTambah}>Tambah Rekening</Text>
        </TouchableOpacity>
        {dataWallet.map((item, idx) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setVisible(true);
                setUtama(item.id_dgm);
                setDeleteData(item.id_user_dgm);
              }}
              style={
                item.akun_utama == 'Yes'
                  ? styles.card
                  : [styles.card, styles.tambahan]
              }
              key={idx}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: IMAGE_URL + item.logo_ewallet,
                  }}
                />
                <View style={{marginLeft: 24}}>
                  <Text style={styles.title}>{item.nama_di_dgm}</Text>
                  <Text style={[styles.title, {color: '#26323880'}]}>
                    {item.nomor_dgm}
                  </Text>
                  {item.akun_utama == 'Yes' ? (
                    <Text style={[styles.title, {color: '#395D76'}]}>
                      Rekening Utama
                    </Text>
                  ) : null}
                </View>
              </View>
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={() => {
                  setVisible(true);
                  setUtama(item.id_dgm);
                  setDeleteData(item.id_user_dgm);
                }}>
                <Icon name="ellipsis-v" color="#C4C4C4" size={15} />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {/* <View style={{backgroundColor: '#fff'}}>
        <TouchableOpacity style={styles.Button}>
          <Text style={styles.textButton}>Pilih Rekening</Text>
        </TouchableOpacity>
      </View> */}

      <Modal
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        style={{marginTop: windowHeight * 0.8}}>
        <View style={styles.modalContainer}>
          <View style={styles.garis} />
          <View>
            <Text style={styles.title}>Menu Lainnya</Text>
            <TouchableOpacity
              style={styles.content}
              onPress={() => ChangeUtama(login[0].id_token, utama)}>
              <Text style={[styles.title, {fontSize: 14, fontWeight: '500'}]}>
                Ubah Rekening Utama
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.content, {borderBottomWidth: 0}]}
              onPress={() => {
                Delete(login[0].id_token, deleteData);
              }}>
              <Text style={[styles.title, {fontSize: 14, fontWeight: '500'}]}>
                Hapus Rekening
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Ewalet;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    shadowColor: '#000',
    height: 60,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textTambah: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    fontSize: 14,
    color: '#263238',
  },
  tinyLogo: {
    width: 74,
    height: 71,
  },
  card: {
    marginHorizontal: 20,
    backgroundColor: '#A9D8D533',
    borderRadius: 10,
    marginTop: 32,
    paddingVertical: 20,
    paddingLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontSize: 16,
    color: '#263238',
  },
  tambahan: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    marginBottom: 5,
  },
  Button: {
    backgroundColor: '#51C091',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 20,
    marginTop: 0,
    height: 50,
  },
  textButton: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
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
    paddingVertical: 10,
    borderBottomColor: '#51C091',
    borderBottomWidth: 1,
  },
});

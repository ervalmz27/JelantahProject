import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  RefreshControl,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Modal} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {
  AkunUtamaBank,
  DeleteBank,
  getDataRekeningBank,
} from '../../../Apis/api/akun/bank';
import {IMAGE_URL} from '../../../config/env';
import Header from '../../component/Header';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const Rekening = ({navigation}) => {
  const login = useSelector(state => state.users.login);
  const [data, setData] = useState();
  const [refreshInterval, setRefreshInterval] = useState(refreshInterval || 0);
  const [dataWallet, setDataWallet] = useState([]);
  const [visible, setVisible] = useState(false);
  const [utama, setUtama] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [idbank, setIdbank] = useState('');
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(fetchRekening, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);
  useEffect(() => {
    login.forEach(el => {
      fetchRekening(el.id_token);
    });
  }, []);

  const fetchRekening = useCallback(async id_token => {
    const Response = await getDataRekeningBank(id_token);
    console.log('Response ---> ', Response.data.rekening);
    setDataWallet(Response.data.rekening);
  }, []);

  const Delete = async (id_token, id_user_bank) => {
    const Response = await DeleteBank(id_token, id_user_bank);
    console.log('Response --- > ', Response.data);
    fetchRekening(login[0].id_token);
    setVisible(false);
  };
  const ChangeUtama = async (id_token, id_bank) => {
    const Response = await AkunUtamaBank(id_token, id_bank);
    console.log('Response --->', Response.data);
    fetchRekening(login[0].id_token);
    setVisible(false);
  };

  return (
    <>
      <Header
        name="Rekening Bank"
        icon="chevron-left"
        onClick={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        style={{
          backgroundColor: '#fff',
          height: windowHeight * 1,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <TouchableOpacity
          style={[styles.button, {marginTop: 20}]}
          onPress={() => {
            navigation.navigate('TambahRekening');
          }}>
          <Icon name="plus" size={12} style={{marginRight: 10}} />
          <Text style={styles.textTambah}>Tambah Rekening</Text>
        </TouchableOpacity>
        {dataWallet.map((item, idx) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setVisible(true);
                setUtama(item.id_user_bank);
                setIdbank(item.id_bank);
              }}
              style={
                item.akun_utama == 'Yes'
                  ? styles.card
                  : [styles.card, styles.tambahan]
              }
              key={idx}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: IMAGE_URL + item.logo_bank,
                  }}
                />
                <View style={{marginLeft: 24}}>
                  <Text style={styles.title}>{item.nama_di_rek}</Text>
                  <Text style={[styles.title, {color: '#26323880'}]}>
                    {item.nama_bank}
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
                }}>
                <Icon name="ellipsis-v" color="#C4C4C4" size={15} />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
              onPress={() => ChangeUtama(login[0].id_token, idbank)}>
              <Text style={[styles.title, {fontSize: 14, fontWeight: '500'}]}>
                Ubah Rekening Utama
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.content, {borderBottomWidth: 0}]}
              onPress={() => {
                Delete(login[0].id_token, utama);
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

export default Rekening;

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

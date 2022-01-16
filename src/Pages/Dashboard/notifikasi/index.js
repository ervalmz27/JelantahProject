import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {getDataInfoPesanDetail} from '../../../Apis/api';
import {OpenPesanDetail} from '../../../Apis/api/dashboard';
import Header from '../../component/Header';
const a = new Date('2021-12-17 18:03:40');
let time = a.getHours();
const d = new Date('2021-11-22 18:03:40');
let hour = d.getHours();
//console.log('====', time, hour);
const Notificat = ({navigation}) => {
  const dataLogin = useSelector(state => state.users.login);
  const [token, setToken] = useState('');
  const [notification, setNotification] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [isOpen, setIsOpen] = useState(0);
  useEffect(() => {
    dataLogin.forEach(el => {
      fetchMessage(el.id_token);
      setToken(el.id_token);
    });
  }, []);

  const fetchMessage = async token => {
    const Response = await getDataInfoPesanDetail(token);
    console.log('Response : ', JSON.stringify(Response.data.notifikasi));
    let open = Response.data.notifikasi;
    setIsOpen(open[0].isOpened);
    setNotification(Response.data.notifikasi);
  };

  const fetchOpenPesanDetail = async (token, idPesan) => {
    const Response = await OpenPesanDetail(token, idPesan);
    // console.log('Response -> ', JSON.stringify(Response.data.data));
    setKategori(Response.data.data);
    const notif = Response.data.data;
  };

  return (
    <>
      <Header
        name="Notifikasi"
        icon="chevron-left"
        onClick={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        {notification.map((items, idx) => {
          return (
            <TouchableOpacity
              style={styles.container}
              key={idx}
              onPress={() => {
                fetchOpenPesanDetail(token, items.id_pesan);
                if (items.kategori_notif_id == '3') {
                  navigation.push('Notifqr', {detail: items.detail_disetujui});
                } else {
                  navigation.push('detailNotif', {detailNotif: items});
                }
                //  else if (items.kategori_notif == 'Info') {
                //   navigation.push('detailNotif', { detailNotif: items });
                // } else if (items.kategori_notif == 'SaldoPoin') {
                //   navigation.push('detailNotif', { detailNotif: items });
                // } else if (items.kategori_notif == 'JadwalSetoranDibuat') {
                //   navigation.push('detailNotif', { detailNotif: items });
                // }
              }}>
              <Text style={isOpen == 0 ? styles.titleBold : styles.title}>
                {items.judul}
              </Text>
              <Text
                numberOfLines={1}
                style={isOpen == 0 ? styles.contentBold : styles.content}>
                {items.pesan}
              </Text>
              <Text style={isOpen == 0 ? styles.texttimeBold : styles.texttime}>
                {items.created_date}
              </Text>
              <View
                style={{
                  borderBottomColor: '#E5E5E5',
                  borderBottomWidth: 1,
                  marginTop: 5,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );
};

export default Notificat;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  content: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  contentBold: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  title: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 1,
    fontFamily: 'Poppins-SemiBold',
    color: '#263238',
  },
  titleBold: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 1,
    fontFamily: 'Poppins-Bold',
    color: '#263238',
  },
  texttime: {
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 21,
    letterSpacing: 1,
    fontFamily: 'Poppins-Reguler',
    color: '#26323833',
    lineHeight: 15,
    marginTop: 5,
  },
  texttimeBold: {
    fontWeight: 'bold',
    fontSize: 10,
    lineHeight: 21,
    letterSpacing: 1,
    fontFamily: 'Poppins-Bold',
    color: '#263238',
    lineHeight: 15,
    marginTop: 5,
  },
});

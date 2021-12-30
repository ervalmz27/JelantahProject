import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import Header from '../../component/Header';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import {getDataRekeningBank} from '../../../Apis/api/akun/bank';
import {useSelector} from 'react-redux';
import {IMAGE_URL} from '../../../config/env';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TarikSaldo = ({navigation}) => {
  const state = useSelector(state => state.users.login);
  console.log('state', state);
  const [ShowComment, setShowModelComment] = useState(false);
  const [animateModal, setanimateModal] = useState(false);
  const [select, setSelect] = useState(false);
  const [dataRekening, setDataRekening] = useState([]);
  useEffect(() => {
    fetchRekening(state[0].id_token);
  }, []);

  const fetchRekening = async id_token => {
    const Response = await getDataRekeningBank(id_token);
    console.log('Response ---> ', Response.data.rekening);

    setDataRekening(Response.data.rekening);
  };
  return (
    <>
      <Header
        name="Tarik Saldo"
        icon="chevron-left"
        onClick={() => navigation.goBack()}
      />
      <TouchableOpacity style={{padding: 20, borderRadius: 50}}>
        <LinearGradient
          colors={['#51C091', '#52b788', '#40916c']}
          style={styles.linearGradient}>
          <Text style={styles.buttonText}>Transfer ke Rekening Baru</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={{padding: 20}}>
        <Text style={styles.text}>Pilih Rekening Tujuan</Text>
      </View>
      <TouchableOpacity
        style={styles.rekening}
        onPress={() => {
          setSelect(!select);
          setShowModelComment(!ShowComment);
        }}>
        <Text>Transfer ke Bank</Text>
        {select == false ? (
          <Icon name="chevron-down" />
        ) : (
          <Icon name="chevron-up" />
        )}
      </TouchableOpacity>

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
              {dataRekening.map((item, idx) => {
                return (
                  <>
                    <TouchableOpacity
                      key={idx}
                      style={styles.content}
                      onPress={() => {
                        // setNameWalet(item.dgm_nama);
                        // setShowModelComment(false);
                        // setanimateModal(false);
                        // setImg(item.dgm_logo);
                        // setIdDgm(item.dgm_id);
                      }}>
                      <Image
                        style={{height: 50, width: 50}}
                        source={{
                          uri: IMAGE_URL + item.logo_bank,
                        }}
                      />
                      <View>
                        <Text
                          style={[
                            styles.title,
                            {fontSize: 14, fontWeight: '500', marginLeft: 10},
                          ]}>
                          {item.nama_di_rek}
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
                          {item.nama_bank}.{item.nomor_rek}
                        </Text>
                      </View>
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

export default TarikSaldo;

const styles = StyleSheet.create({
  linearGradient: {
    // flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',

    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    color: '#263238',
  },
  rekening: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: '#51C091',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
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

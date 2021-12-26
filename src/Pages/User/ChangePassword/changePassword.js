import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Modal, ModalContent} from 'react-native-modals';
import {change_password} from '../../../Apis/api/Auth';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const GantiPassword = ({navigation, route}) => {
  const {token} = route.params;
  const [form, setForm] = useState({
    user_password: '',
    konfir_password: '',
  });
  const [security, setSecurity] = useState(true);
  const [secur, setSecur] = useState(true);
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const ChngePassword = async (code, password) => {
    setLoading(true);
    const Response = await change_password(code, password);
    // console.log('Response -> ', Response.data.data);
    const valid = Response.data.data;
    valid.forEach(el => {
      setContent(el.msg);
      navigation.navigate('User');
      setVisible(true);
      setLoading(false);
    });
  };
  return (
    <>
      <View style={styles.header}>
        <View
          style={{marginTop: 25, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-left"
              size={15}
              color="#fff"
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Buat Password</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Buat Password Baru</Text>
          <Text style={styles.content}>
            Silakan ubah password untuk akun mu
          </Text>
        </View>

        <View
          style={[styles.containerInput, {justifyContent: 'space-between'}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Icon
              name="lock"
              size={15}
              color="#51C091"
              style={{marginLeft: 10}}
            /> */}
            <TextInput
              placeholder="Password Baru"
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
        <View
          style={[styles.containerInput, {justifyContent: 'space-between'}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Icon
              name="lock"
              size={15}
              color="#51C091"
              style={{marginLeft: 10}}
            /> */}
            <TextInput
              placeholder="Konfirmasi Password"
              style={styles.input}
              value={form.konfir_password}
              secureTextEntry={secur}
              onChangeText={corn => {
                setForm({...form, konfir_password: corn});
                setDisable(false);
                if (corn.length == 0) {
                  setDisable(true);
                }
              }}
            />
          </View>
          {secur == true ? (
            <TouchableOpacity
              onPress={() => {
                setSecur(!secur);
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
                setSecur(!secur);
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
      </ScrollView>
      <View>
        <TouchableOpacity
          disabled={disable}
          style={disable ? styles.disable : styles.Button}
          onPress={() => {
            if (form.user_password == form.konfir_password) {
              ChngePassword(token, form.user_password);
            } else {
              alert('password anda tidak valid!! mohon Periksa kembali!');
            }
          }}>
          {loading == true ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.text}>Ubah Password</Text>
          )}
        </TouchableOpacity>
      </View>
      <Modal
        visible={visible}
        onTouchOutside={() => {
          setVisible(false);
        }}>
        <ModalContent>
          <View>
            <Text>{content}</Text>
          </View>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GantiPassword;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#51C091',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: windowHeight * 0.15,
    justifyContent: 'flex-start',
  },
  icon: {
    marginRight: 15,
  },
  textHeader: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
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
  input: {
    fontFamily: 'Poppins-Reguler',
    color: '#010101',
    padding: 10,
    marginLeft: 5,
    width: windowWidth * 0.6,
  },
  containerInput: {
    marginHorizontal: 20,

    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#51C091',
    alignItems: 'center',
  },
  container: {
    padding: 10,
  },
  content: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#26323880',
    marginTop: 10,
  },

  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '700',
    fontSize: 18,
  },
});

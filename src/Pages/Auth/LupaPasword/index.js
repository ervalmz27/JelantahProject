import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {Modal, ModalContent} from 'react-native-modals';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {forgotPaswword} from '../../../Apis/api/Auth';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const LupaPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const Forgot = async em => {
    setLoading(true);
    try {
      const forgot = await forgotPaswword(em);
      console.log('--->', forgot.data);
      const Lupas = forgot.data.data;
      Lupas.forEach(el => {
        if (el.status != 'failed') {
          setVisible(true);

          setContent(el.msg);
          navigation.push('sendotp', {gmail: email});
          setLoading(false);
        } else {
          setLoading(false);
          setVisible(true);

          setContent(el.msg);
        }
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
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
          <Text style={styles.textHeader}>Ubah Password</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Ganti Password</Text>
          <Text style={styles.content}>
            Silahkan Masukkan email yang terdaftar Kami akan Mengitimkan kode
            verifikasi ntuk mengatur ulang password mu.
          </Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            onChangeText={e => setEmail(e)}
          />
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity
          disabled={loading}
          style={styles.button}
          onPress={() => {
            Forgot(email.toLowerCase());
            // navigation.push('sendotp', {gmail: email});
            console.log('email', email.toLowerCase());
          }}>
          {loading == true ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.text}>Selanjutnya</Text>
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

export default LupaPassword;

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
  container: {
    padding: 10,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '700',
    fontSize: 18,
  },
  content: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#26323880',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#EBEBEB80',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
    fontFamily: 'Poppins-Regular',
    marginTop: 20,
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

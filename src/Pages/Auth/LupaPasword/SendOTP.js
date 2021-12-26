import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CountDown from 'react-native-countdown-component';
import {getOTPEmail} from '../../../Apis/api/Auth';
import {Modal, ModalContent} from 'react-native-modals';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SendOTP = ({navigation, route}) => {
  const {gmail} = route.params;
  console.log(gmail);
  const [code, setCode] = useState('');
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const checkOtpEmail = async (email, otp) => {
    const Response = await getOTPEmail(email, otp);
    console.log('Response -> ', Response.data.data);
    const alert = Response.data.data;
    alert.forEach(it => {
      if (it.status != 'failed') {
        navigation.push('ubahPassword', {token: it.id_token});
      } else {
        setVisible(true);
        setContent(it.msg);
      }
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
          <Text style={styles.textHeader}>Kode Verifikasi</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Masukkan Kode Verifikasi</Text>
          <Text style={styles.content}>
            Silahkan Masukkan kode verifikasi yang telah kamu dapatkan dari
            email mu
          </Text>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <OTPInputView
            style={{width: '70%', height: 200}}
            pinCount={4}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            onCodeChanged={otp => {
              setCode(otp);
            }}
            code={code}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              console.log(`Code is ${code}, you are good to go!`);
              checkOtpEmail(gmail, code);
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            marginTop: -60,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            marginLeft: windowWidth * 0.07,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              fontWeight: '600',
              marginRight: 10,
            }}>
            Kirim ulang
          </Text>
          <CountDown
            until={240}
            size={30}
            onFinish={() => {}}
            digitStyle={{backgroundColor: '#FFF', height: 20, width: 20}}
            digitTxtStyle={{color: '#51C091', fontSize: 12}}
            timeToShow={['S']}
            timeLabels={{s: null}}
          />
        </TouchableOpacity>
      </ScrollView>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.text}>Verifikasi</Text>
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

export default SendOTP;

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
  borderStyleBase: {
    width: 80,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 40,
    height: 45,
    color: '#000',

    borderColor: '#51C091',
    borderRadius: 5,
  },

  underlineStyleHighLighted: {
    borderColor: '#51C091',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
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

  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});

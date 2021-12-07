import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Logo from '../../assets/Images/Logo.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ilustrasi from '../../assets/Images/Ilustrasi.svg';
import {ScrollView} from 'react-native-gesture-handler';
import {getUsersRequest} from '../../Apis/actions/users';
import {connect} from 'react-redux';
import {getUsersSuccess, getLoginUsers} from '../../Apis/actions/users';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Auth = ({navigation, props, users}) => {
  const globalState = useSelector(state => state);
  const [status, setStatus] = useState(false);
  console.log('-----', users.items);
  const [Login, setLogin] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setLogin({...Login, username: '', password: ''});
  }, []);
  useEffect(async () => {
    const validate = async () => {
      const login = await AsyncStorage.getItem('token');
      return login;
    };
  }, []);

  console.log('username Terdaftar : ', globalState);
  const userLogin = async (email, password) => {
    try {
      const data = {
        email: email,
        password: password,
      };
      const res = await axios
        .post('https://reqres.in/api/login', data)
        .then(res => {
          // navigation.navigate('Dashboard');
          const jsonValue = JSON.stringify(res.data);
          AsyncStorage.setItem('token', jsonValue);
          dispatch(getUsersSuccess(res.data));
          dispatch(getLoginUsers(true));
        })
        .catch(err => {
          console.log(err);
          alert(
            'Username atau Password anda tidak ditemukan mohon untuk diperiksa Kembali',
          );
        });
    } catch (error) {
      console.log('Mess Error : ', error);
    }
  };
  const handleOpen = (email, password) => {
    userLogin(email, password);
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Logo width={173} height={111} />
          </View>
          <View style={styles.card}>
            {/* Username */}
            <View>
              <Text style={styles.text}>Email :</Text>
              <TextInput
                style={styles.input}
                value={Login.username}
                onChangeText={user => setLogin({...Login, username: user})}
                placeholder="username"
              />
            </View>
            {/* Password */}
            <View>
              <Text style={styles.text}>Password :</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.input}
                value={Login.password}
                onChangeText={pass => setLogin({...Login, password: pass})}
                placeholder="Password"
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleOpen(Login.username, Login.password);
              }}>
              <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.daftar}>
            <Text style={styles.fontDaftar}>
              Belum Punya Akun ? Klik Untuk Daftar
            </Text>
          </View>
          <View style={styles.bola}>
            <Ilustrasi width={328} height={196} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

// export default Auth;
export default connect(({users}) => ({users}), {
  getUsersRequest,
})(Auth);

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', padding: 24},
  card: {
    marginTop: 32,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: windowWidth * 0.86,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    marginVertical: 10,
    padding: 5,
    paddingHorizontal: 10,
  },
  text: {fontFamily: 'Lato-Bold', color: '#000', fontSize: 18},
  button: {
    backgroundColor: '#22668A',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  textButton: {
    fontFamily: 'Lato-Bold',
    color: '#fff',
    fontSize: 18,
  },
  daftar: {
    width: windowWidth * 0.55,
    margin: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontDaftar: {
    fontSize: 20,
    color: '#22668A',
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
  },
  bola: {
    marginLeft: 164,
  },
});

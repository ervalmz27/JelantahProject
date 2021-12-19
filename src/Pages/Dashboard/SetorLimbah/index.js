import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import Header from '../../component/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Cupon from '../../../assets/Images/cupon.svg';
import House from '../../../assets/Images/Icon/House.svg';
import Recovery from '../../../assets/Images/Icon/Recovery.svg';
import Tanggal from '../../../assets/Images/Icon/Tanggal.svg';
import Jam from '../../../assets/Images/Icon/Jam.svg';
import Timbangan from '../../../assets/Images/Icon/Timbangan.svg';
import Line from '../../../assets/Images/Line.svg';
import Geolocation from '@react-native-community/geolocation';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import DateTimePicker from '@react-native-community/datetimepicker';
import {getDataRTNearby} from '../../../Apis/api';
import {useSelector} from 'react-redux';

const SetorLimbah = ({navigation}) => {
  const token = useSelector(state => state.users.login);
  // console.log(token);
  const [dropdown, setDropdown] = useState(true);
  const [placeholder, setPlaceholder] = useState({
    Rukun: 'Pilih RT Terdekat',
    limbah: 'Pilih Jenis Limbah',
    tanggal: 'Pilih Tanggal',
    jam: 'Pilih Jam',
  });
  const [form, setForm] = useState({
    user_fullname: '',
    user_email: '',
    user_nohp: '',
    user_password: '',
    code_ref: null,
  });
  const [latt, setLatt] = useState({
    lantitude: null,
    longitude: null,
  });
  //  =========================== State ============================
  const [timbangan, setTimbangan] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [time, setTime] = useState(new Date());
  const [modeTime, setModeTime] = useState('time');
  const [disable, setDisable] = useState(true);
  const [dist, setToken] = useState('');
  const [alamat, setAlamat] = useState([]);
  const [limbah, setLimbah] = useState(true);
  //  =========================== End State ==========================

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      token.forEach((item, i) => {
        const all = item.id_token;

        setToken(all);
      });
      console.log(info);
      setLatt({
        ...latt,
        lantitude: info.coords.latitude,
        longitude: info.coords.longitude,
      });
      fetchDataRTNearby();
    });
  }, []);

  const fetchDataRTNearby = async (Token, latt, long) => {
    const Response = await getDataRTNearby(Token, latt, long);

    const nestedRt = Response.data.nearby_rt;
    setAlamat(nestedRt);
  };

  // on Chahnge Tanggal
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    const tgl =
      currentDate.getDate() < 10
        ? '0' + currentDate.getDate()
        : currentDate.getDate();
    const bln =
      currentDate.getMonth() + 1 < 10
        ? '0' + (currentDate.getMonth() + 1)
        : currentDate.getMonth() + 1;
    setPlaceholder({
      ...placeholder,
      tanggal: tgl + '/' + bln + '/' + currentDate.getFullYear(),
    });
  };
  const onChangetime = (event, selectedDate) => {
    console.log('event', event);
    console.log('selectedDate', selectedDate);
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setTime(currentDate);

    setPlaceholder({
      ...placeholder,
      jam: currentDate.getHours() + ':' + currentDate.getMinutes(),
    });
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <>
      <Header
        icon="chevron-left"
        name="Setor Limbah"
        onClick={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.textHeader}>
            Sebelum kamu menyetor limbah mu, harap lengkapi form berikut ini!
          </Text>
        </View>

        {/* username */}
        <TouchableOpacity
          onPress={() => {
            setDropdown(!dropdown);
            fetchDataRTNearby(dist, latt.lantitude, latt.longitude);
          }}
          style={styles.container}>
          <View>
            <House height={20} width={20} />
          </View>

          <View
            style={[
              styles.input,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '92%',
              },
            ]}>
            <View style={{width: windowWidth * 0.72}}>
              <Text style={styles.textInput}>{placeholder.Rukun}</Text>
            </View>
            {dropdown == false ? (
              <TouchableOpacity
                onPress={() => {
                  setDropdown(!dropdown);
                }}>
                <Icon
                  name="play"
                  color="#51C09180"
                  style={{transform: [{rotate: '270deg'}]}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setDropdown(!dropdown);
                  fetchDataRTNearby(dist, latt.lantitude, latt.longitude);
                }}>
                <Icon
                  name="play"
                  color="#51C09180"
                  style={{transform: [{rotate: '90deg'}]}}
                />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
        {/* dropdown */}
        {dropdown == false ? (
          <View
            style={{
              backgroundColor: '#fff',
              marginHorizontal: 20,
              padding: 10,
            }}>
            {alamat.map((i, idx) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setPlaceholder({
                      ...placeholder,
                      Rukun:
                        i.nama_rt +
                        '/' +
                        i.nama_rw +
                        '/' +
                        i.nama_kel +
                        '/' +
                        i.nama_kec +
                        '/' +
                        i.nama_kota +
                        '/' +
                        i.nama_prov,
                    });
                    setDropdown(!dropdown);
                  }}
                  key={idx}
                  style={[styles.container, {padding: 10}]}>
                  <Text style={styles.textInput}>
                    {i.nama_rt}/{i.nama_rw}/{i.nama_kel}/{i.nama_kec}/
                    {i.nama_kota}/{i.nama_prov}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}

        {/* Jenis Limbah */}
        <View style={[styles.container, {marginTop: 10}]}>
          <View>
            <Recovery height={20} width={20} />
          </View>

          <View
            style={[
              styles.input,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '92%',
              },
            ]}>
            <Text style={styles.textInput}>{placeholder.limbah}</Text>
            {limbah == false ? (
              <TouchableOpacity
                onPress={() => {
                  setLimbah(!limbah);
                }}>
                <Icon
                  name="play"
                  color="#51C09180"
                  style={{transform: [{rotate: '270deg'}]}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setLimbah(!limbah);
                }}>
                <Icon
                  name="play"
                  color="#51C09180"
                  style={{transform: [{rotate: '90deg'}]}}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {limbah == false ? (
          <View
            style={{
              backgroundColor: '#fff',
              marginHorizontal: 20,
              padding: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                setPlaceholder({...placeholder, limbah: 'Minyak Jelantah'});
                setLimbah(!limbah);
              }}
              style={[styles.container, {padding: 10}]}>
              <Text style={styles.textInput}>Minyak Jelantah</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {/* =================== End Limbah ============== */}
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* Tanggal */}
          <View style={[styles.container, {width: 150, marginTop: 10}]}>
            <View>
              <Tanggal height={20} width={20} />
            </View>
            <View
              style={[
                styles.input,
                {
                  flexDirection: 'row',

                  alignItems: 'center',
                  width: '90%',
                },
              ]}>
              <Text style={styles.textInput}>{placeholder.tanggal}</Text>
              <TouchableOpacity
                style={{marginLeft: 15}}
                onPress={() => {
                  showDatepicker();
                }}>
                <Icon
                  name="play"
                  color="#51C09180"
                  style={{transform: [{rotate: '90deg'}]}}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Jam berrrs */}
          <View style={[styles.container, {width: 150, marginTop: 10}]}>
            <View>
              <Jam height={20} width={20} />
            </View>
            <View
              style={[
                styles.input,
                {
                  flexDirection: 'row',

                  alignItems: 'center',
                  width: '90%',
                },
              ]}>
              <Text style={styles.textInput}>{placeholder.jam}</Text>
              <TouchableOpacity
                style={{position: 'absolute', right: 20}}
                onPress={() => {
                  setShowDate(true);
                }}>
                <Icon
                  name="play"
                  color="#51C09180"
                  style={{transform: [{rotate: '90deg'}]}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Timbangan */}
        <View style={[styles.container, {marginTop: 10}]}>
          <View>
            <Timbangan height={20} width={20} />
          </View>
          <TextInput
            placeholder="Masukkan Berat Minyak"
            style={styles.input}
            value={timbangan}
            onChangeText={event => {
              setTimbangan(event);
              setDisable(false);
            }}
          />
          <View style={{marginLeft: 50}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                fontFamily: 'Poppins-Reguler',
                color: 'rgba(81, 192, 145, 0.5)',
              }}>
              Rp500/gram
            </Text>
          </View>
        </View>
        {/* ========================= */}
        <View style={{marginTop: 32}}>
          <Line color="#aeaeae" width={windowWidth * 1} />
        </View>
        {/* =============== POint yang Didapat ================== */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Poppins-Reguler',
              color: '#000',
            }}>
            Saldo didapat
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Poppins-Bold',
              color: '#51C091',
            }}>
            + Rp50.000
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Poppins-Reguler',
              color: '#000',
            }}>
            Poin didapat
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Poppins-Bold',
              color: '#FFDD67',
            }}>
            50 POIN
          </Text>
        </View>
      </ScrollView>
      <View style={{margin: 10}}>
        <TouchableOpacity
          style={disable ? styles.disable : styles.Button}
          disabled={disable}
          onPress={() => {
            navigation.navigate('berhasil');
          }}>
          <Text
            style={{color: '#fff', fontSize: 14, fontFamily: 'Poppins-Bold'}}>
            Ajukan Jadwal
          </Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode={modeTime}
          is24Hour={true}
          display="default"
          onChange={onChangetime}
        />
      )}
    </>
  );
};

export default SetorLimbah;

const styles = StyleSheet.create({
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
  header: {
    padding: 20,
    alignItems: 'flex-start',
    width: windowWidth * 0.8,
  },
  textHeader: {
    fontFamily: 'Poppins-Bold',
    color: '#455A6480',
    textAlign: 'left',
  },
  textInput: {
    fontSize: 14,
    fontFamily: 'Poppins-Regules',
    fontWeight: '400',
    color: '#26323880',
  },

  button: {
    backgroundColor: '#51C091',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 20,
    marginTop: 15,
    marginLeft: 20,
  },
  input: {
    fontFamily: 'Poppins-Reguler',
    color: '#010101',
    padding: 10,
    marginLeft: 5,
  },
  container: {
    marginHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#51C091',
    alignItems: 'center',
  },
  fontReguler: {
    fontFamily: 'Poppins-Regular',
  },
  buttonOutlin: {
    borderWidth: 1,
    borderColor: '#51C091',
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
});

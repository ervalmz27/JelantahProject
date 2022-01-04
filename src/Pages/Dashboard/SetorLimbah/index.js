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
import {useSelector, useDispatch} from 'react-redux';
import {
  getLimbah,
  getPerkiraan,
  JadwalSetoran,
} from '../../../Apis/api/SetorLimbah';
import {getQrCode} from '../../../Apis/actions/users';
import moment from 'moment';
import AppLoader from '../../component/AppLoader';

const SetorLimbah = ({navigation}) => {
  const token = useSelector(state => state.users.login);
  console.log('Hallo', token);
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(true);
  const [placeholder, setPlaceholder] = useState({
    Rukun: 'Pilih Mitra Terdekat',
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
  const [dataLimbah, setDataLimbah] = useState([]);
  const [level, setLevel] = useState('');
  const [tokenMitra, setTokenMitra] = useState('');
  const [idLimbah, setIDLimbah] = useState('');
  const [sendTanggal, setSendTanggal] = useState('');
  const [loading, setLoading] = useState(false);
  const [perkiraanPoin, setPerkiraanPoin] = useState({
    harga: null,
    poin: null,
  });
  //  =========================== End State ==========================

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      token.forEach((item, i) => {
        const all = item.id_token;

        setToken(all);
      });
      setLatt({
        ...latt,
        lantitude: info.coords.latitude,
        longitude: info.coords.longitude,
      });
      fetchDataRTNearby();
    });
    Limbah();

    token.forEach(al => {
      setLevel(al.user_level);
    });
  }, []);

  const fetchDataRTNearby = async (Token, latt, long) => {
    const Response = await getDataRTNearby(Token, latt, long);

    const nestedRt = Response.data.nearby_rt;
    setAlamat(nestedRt);
    nestedRt.forEach((it, idx) => {
      console.log(it);
    });
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
    const dataTanggal = moment(currentDate.getFullYear() + bln + tgl).format(
      'YYYY-MM-DD',
    );

    setSendTanggal(dataTanggal);
    console.log('Hallloooo tanggal ----->', dataTanggal);
  };
  const onChangetime = (event, selectedDate) => {
    console.log('event', event);
    console.log('selectedDate', selectedDate);
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setTime(currentDate);
    const setAll =
      currentDate.getHours() +
      ':' +
      currentDate.getMinutes() +
      ':' +
      currentDate.getSeconds();
    console.log(setAll, '----');
    setPlaceholder({
      ...placeholder,
      jam:
        currentDate.getHours() +
        ':' +
        currentDate.getMinutes() +
        ':' +
        currentDate.getSeconds(),
    });
    console.log(
      'hhhhh---->',
      currentDate.getHours() +
        ':' +
        currentDate.getMinutes() +
        ':' +
        currentDate.getSeconds(),
    );
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const Limbah = async () => {
    const Response = await getLimbah();
    console.log('Response -> ', Response.data.limbah);
    setDataLimbah(Response.data.limbah);
  };

  const Perkiraan = async (volume, lvl) => {
    try {
      const Response = await getPerkiraan(volume, lvl);
      let coin = Response.data.data;
      coin.forEach(all => {
        console.log(all.harga, all.poin);
        setPerkiraanPoin({
          ...perkiraanPoin,
          harga: all.harga,
          poin: all.poin,
        });
      });
    } catch (error) {
      console.log('Message', error);
    }
  };

  const ajukanJadwal = async (
    id_token_from,
    id_token_to,
    limbah_kat_id,
    tanggal,
    jam,
    volume,
  ) => {
    setLoading(true);
    try {
      const Response = await JadwalSetoran(
        id_token_from,
        id_token_to,
        limbah_kat_id,
        tanggal,
        jam,
        volume,
      );
      console.log('Response', Response.data.data);
      setLoading(false);
      dispatch(getQrCode(Response.data.data));
    } catch (error) {
      console.log('Message', error);
    }
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
                    setTokenMitra(i.id_token_rt);
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
        <TouchableOpacity
          style={[styles.container, {marginTop: 10}]}
          onPress={() => {
            setLimbah(!limbah);
          }}>
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
        </TouchableOpacity>
        {limbah == false ? (
          <View
            style={{
              backgroundColor: '#fff',
              marginHorizontal: 20,
              padding: 10,
            }}>
            {dataLimbah.map((i, idx) => {
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => {
                    setPlaceholder({...placeholder, limbah: i.limbah_nama});
                    setLimbah(!limbah);
                    setIDLimbah(i.limbah_kategori_id);
                  }}
                  style={[styles.container, {padding: 10}]}>
                  <Text style={styles.textInput}>{i.limbah_nama}</Text>
                </TouchableOpacity>
              );
            })}
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
          <TouchableOpacity
            onPress={() => {
              showDatepicker();
            }}
            style={[styles.container, {width: 150, marginTop: 10}]}>
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
              <TouchableOpacity style={{marginLeft: 15}}>
                <Icon
                  name="play"
                  color="#51C09180"
                  style={{transform: [{rotate: '90deg'}]}}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          {/* Jam berrrs */}
          <TouchableOpacity
            style={[styles.container, {width: 150, marginTop: 10}]}
            onPress={() => {
              setShowDate(true);
            }}>
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
              <TouchableOpacity style={{position: 'absolute', right: 20}}>
                <Icon
                  name="play"
                  color="#51C09180"
                  style={{transform: [{rotate: '90deg'}]}}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
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
            keyboardType="number-pad"
            onChangeText={event => {
              setTimbangan(event);

              if (Number(event) >= 500) {
                setDisable(false);
                console.log(typeof event);
                Perkiraan(String(event), level);
              }
            }}
          />
          <View style={{marginLeft: windowWidth * 0.25}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                fontFamily: 'Poppins-SemiBold',
                color: 'rgba(81, 192, 145, 0.5)',
              }}>
              gram
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
            {perkiraanPoin.harga}
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
            {perkiraanPoin.poin}
          </Text>
        </View>
      </ScrollView>
      <View style={{margin: 10}}>
        <TouchableOpacity
          style={disable ? styles.disable : styles.Button}
          disabled={disable}
          onPress={() => {
            console.log(
              dist,
              tokenMitra,
              idLimbah,

              sendTanggal,
              placeholder.jam,
              timbangan,
            );
            ajukanJadwal(
              dist,
              tokenMitra,
              idLimbah,

              sendTanggal,
              placeholder.jam,
              timbangan,
            );
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
      {loading == true ? <AppLoader /> : null}
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

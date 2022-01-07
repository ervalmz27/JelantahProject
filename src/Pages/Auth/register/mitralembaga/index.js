import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Cupon from '../../../../assets/Images/cupon.svg';
import Header from '../../../component/Header';
import {
  getDataLembaga,
  getKabupaten,
  getKecamatan,
  getKelurahan,
  getProvinsi,
  getRT,
  getRW,
  RegisterLembaga,
} from '../../../../Apis/api/Auth';
import {Modal} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import {FlatList} from 'react-native-gesture-handler';
import AppLoader from '../../../component/AppLoader';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const MitraLembaga = ({navigation}) => {
  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      console.log('info', info.coords);
      setLat(info.coords.latitude);
      setLong(info.coords.longitude);
    });
  }, []);
  const flatListRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [security, setSecurity] = useState(true);
  const [rege, setRegex] = useState(false);
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [lembaga, setLembaga] = useState([]);
  const [nameLembaga, setNameLembaga] = useState({
    name: 'Pilih Mitra Lembaga',
    province: 'Pilih Provinsi',
    Kabupaten: 'Pilih Kabupaten/Kota',
    kecamatan: 'Pilih Kecamatan',
    kelurahan: 'Pilih Kelurahan/Desa',
    rw: 'Pilih RW',
    rt: 'Pilih RT',
  });
  const [formId, setFormID] = useState({
    id_level: '',
    id_prov: '',
    id_kab: '',
    id_kec: '',
    id_kel: '',
    id_rw: '',
    id_rt: '',
  });
  console.log('formId --------------> ', formId);
  const [visible, setVisible] = useState(false);
  // provinsi
  const [nameProvinsi, setNameProvinsi] = useState([]);
  const [onProvinsi, setOnProvinsi] = useState(false);
  // kabupaten
  const [kabupaten, setKabupaten] = useState([]);
  const [kotaVisible, setKotaVisible] = useState();
  // kecamatan
  const [kecamatan, setKecamatan] = useState([]);
  const [kecamVisible, setKecamVisible] = useState(false);
  // Kelurahan/Desa
  const [desa, setDesa] = useState([]);
  const [desaVisible, setDesaVisible] = useState(false);
  // Rw
  const [dataRw, setDataRw] = useState([]);
  const [rwVisible, setRwVisible] = useState(false);
  // RT
  const [dataRt, setDataRt] = useState([]);
  const [rtVisible, setRtVisible] = useState(false);
  const [form, setForm] = useState({
    user_fullname: '',
    user_email: '',
    user_nohp: '',
    user_password: '',
    code_ref: null,
  });
  // console.log(form);
  const handleBack = () => {
    navigation.goBack();
  };
  const [contentModal, setContentModal] = useState('');
  const [content, setContent] = useState(false);
  const regex = event => {
    console.log('===========', event);
    const nameRegex =
      /^(\()?(08)(\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/;

    if (nameRegex.test(event)) {
      setForm({...form, user_nohp: event});
      console.log('----', event);
      return true;
    } else {
      setForm({...form, user_nohp: event});
      return false;
    }
  };
  const validateEmail = text => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      setForm({...form, user_email: text});
      return false;
    } else {
      setForm({...form, user_email: text});
      console.log('Email is Correct');
    }
  };

  useEffect(() => {
    getLembaga();

    GetProvinsi();
  }, []);
  const getLembaga = async () => {
    const Lembaga = await getDataLembaga();
    // console.log('Lembaga---->', Lembaga.data.lembaga);
    setLembaga(Lembaga.data.lembaga);
  };
  const GetProvinsi = async () => {
    const provinsi = await getProvinsi();
    setNameProvinsi(provinsi.data.provinsi);
  };
  const GetKabupaten = async id_prov => {
    const provinsi = await getKabupaten(id_prov);
    // console.log('provinsi---->', provinsi.data.kabupaten);
    setKabupaten(provinsi.data.kabupaten);
  };
  const GetKecamatan = async id_kab => {
    const kecaman = await getKecamatan(id_kab);
    // console.log('kecaman---->', kecaman.data.kecamatan);
    setKecamatan(kecaman.data.kecamatan);
  };
  const GetDesa = async id_kec => {
    const kecaman = await getKelurahan(id_kec);
    console.log('kecaman---->', kecaman.data.kelurahan);
    setDesa(kecaman.data.kelurahan);
  };
  const GetDataRW = async id_kel => {
    const kecaman = await getRW(id_kel);
    console.log('kecaman---->', kecaman.data);
    setDataRw(kecaman.data.rw);
  };
  const GetDataRT = async id_rw => {
    const kecaman = await getRT(id_rw);
    console.log('kecaman---->', kecaman.data.rt);
    setDataRt(kecaman.data.rt);
  };
  const registerLEmbaga = async (
    user_fullname,
    user_email,
    user_nohp,
    user_password,
    code_ref,
    id_level,
    id_prov,
    id_kab,
    id_kec,
    id_kel,
    id_rw,
    id_rt,
    lat,
    long,
  ) => {
    setLoading(true);
    const Response = await RegisterLembaga(
      user_fullname,
      user_email,
      user_nohp,
      user_password,
      code_ref,
      id_level,
      id_prov,
      id_kab,
      id_kec,
      id_kel,
      id_rw,
      id_rt,
      lat,
      long,
    );
    if (Response.data.data[0].status == 'success') {
      setContentModal(Response.data.data[0].msg);
      setLoading(false);
      setTimeout(() => {
        navigation.navigate('Loginscreen');
      }, 2000);
    } else {
      setLoading(false);
      setContentModal(Response.data.data[0].msg);
      setContent(true);
    }
    console.log('Response', Response.data);
  };
  return (
    <>
      <Header
        icon="chevron-left"
        name="Daftar Mitra Lembaga"
        onClick={() => handleBack()}
      />

      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.textHeader}>
            Gabung sekarang menjadi mitra lembaga kami!
          </Text>
        </View>

        {/* username */}
        <View style={styles.container}>
          <Icon
            name="user-alt"
            size={15}
            color="#51C091"
            style={{marginLeft: 10}}
          />
          <TextInput
            placeholder="Nama Lengkap"
            style={styles.input}
            value={form.user_fullname}
            onChangeText={e => {
              setForm({...form, user_fullname: e});
            }}
          />
        </View>
        {/* endusernamme */}
        {/* Email */}
        <View style={styles.container}>
          <Icon name="at" size={15} color="#51C091" style={{marginLeft: 10}} />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={styles.input}
            value={form.user_email}
            onChangeText={mail => {
              validateEmail(mail);
            }}
          />
        </View>
        {/* endEmail */}
        {/* Nomor Handphon */}
        <View style={styles.container}>
          <Icon
            name="phone"
            size={15}
            color="#51C091"
            style={{marginLeft: 10}}
          />
          <TextInput
            placeholder="Nomor HP (Whatsapp)"
            style={styles.input}
            keyboardType="numeric"
            value={form.user_nohp}
            onChangeText={no => {
              // setForm({...form, user_nohp: no});
              regex(no);
            }}
            maxLength={14}
          />
        </View>
        {/* end Nomor Handphon */}
        {/* password */}
        <View style={[styles.container, {justifyContent: 'space-between'}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="lock"
              size={15}
              color="#51C091"
              style={{marginLeft: 10}}
            />
            <TextInput
              placeholder="Password"
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
        {/* end Pasword */}
        {/* kupon */}

        <View style={styles.container}>
          <View style={{marginLeft: 10}}>
            <Cupon height={18} width={18} />
          </View>
          <TextInput
            placeholder="Kode Referral (opsional)"
            style={styles.input}
            value={form.code_ref}
            onChangeText={code => {
              setForm({...form, code_ref: code});
            }}
          />
        </View>
        {/* end Kupon*/}
        {/* Mitraaaa ==---------------------- */}
        <TouchableOpacity
          style={[styles.container, {paddingVertical: 3}]}
          onPress={() => {
            setVisible(true);
          }}>
          <View
            style={[
              styles.input,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: windowWidth * 0.89,
              },
            ]}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                color: '#26323880',
              }}>
              {nameLembaga.name}
            </Text>
            <Icon name="chevron-down" color="#26323880" />
          </View>
        </TouchableOpacity>
        {/* ------------------- ent Mitra ---------- */}
        {nameLembaga.name != 'Pilih Mitra Lembaga' &&
        nameLembaga.name != 'Mitra Kementerian' ? (
          <TouchableOpacity
            style={[styles.container, {paddingVertical: 3}]}
            onPress={() => {
              setOnProvinsi(true);
            }}>
            <View
              style={[
                styles.input,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: windowWidth * 0.89,
                },
              ]}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  color: '#26323880',
                }}>
                {nameLembaga.province}
              </Text>
              <Icon name="chevron-down" color="#26323880" />
            </View>
          </TouchableOpacity>
        ) : null}
        {/* ------------------- ent Mitra ---------- */}
        {/* -p----------------- Kabupaten ----------------- */}
        {nameLembaga.name != 'Pilih Mitra Lembaga' &&
        nameLembaga.name != 'Mitra Provinsi' &&
        nameLembaga.name != 'Mitra Kementerian' ? (
          <TouchableOpacity
            style={[styles.container, {paddingVertical: 3}]}
            onPress={() => {
              setKotaVisible(true);
            }}>
            <View
              style={[
                styles.input,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: windowWidth * 0.89,
                },
              ]}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  color: '#26323880',
                }}>
                {nameLembaga.Kabupaten}
              </Text>
              <Icon name="chevron-down" color="#26323880" />
            </View>
          </TouchableOpacity>
        ) : null}
        {/* ------------------ end Kabupaten -------------------------- */}
        {/* ------------------ start Kecamatan -------------------------- */}
        {nameLembaga.name != 'Pilih Mitra Lembaga' &&
        nameLembaga.name != 'Mitra Provinsi' &&
        nameLembaga.name != 'Mitra Kementerian' &&
        nameLembaga.name != 'Mitra Kabupaten/Kota' ? (
          <TouchableOpacity
            style={[styles.container, {paddingVertical: 3}]}
            onPress={() => {
              setKecamVisible(true);
            }}>
            <View
              style={[
                styles.input,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: windowWidth * 0.89,
                },
              ]}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  color: '#26323880',
                }}>
                {nameLembaga.kecamatan}
              </Text>
              <Icon name="chevron-down" color="#26323880" />
            </View>
          </TouchableOpacity>
        ) : null}
        {/* ----------------- End Kecamatan -------------- */}
        {/* ----------------- Kelurahan ----------------- */}
        {nameLembaga.name != 'Pilih Mitra Lembaga' &&
        nameLembaga.name != 'Mitra Provinsi' &&
        nameLembaga.name != 'Mitra Kementerian' &&
        nameLembaga.name != 'Mitra Kabupaten/Kota' &&
        nameLembaga.name != 'Mitra Kecamatan' ? (
          <TouchableOpacity
            style={[styles.container, {paddingVertical: 3}]}
            onPress={() => {
              setDesaVisible(true);
            }}>
            <View
              style={[
                styles.input,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: windowWidth * 0.89,
                },
              ]}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  color: '#26323880',
                }}>
                {nameLembaga.kelurahan}
              </Text>
              <Icon name="chevron-down" color="#26323880" />
            </View>
          </TouchableOpacity>
        ) : null}
        {/* -----------------End Kelurahan -------------- */}
        {/* ----------------- RW ----------------- */}
        {nameLembaga.name != 'Pilih Mitra Lembaga' &&
        nameLembaga.name != 'Mitra Provinsi' &&
        nameLembaga.name != 'Mitra Kementerian' &&
        nameLembaga.name != 'Mitra Kabupaten/Kota' &&
        nameLembaga.name != 'Mitra Kecamatan' &&
        nameLembaga.name != 'Mitra Kelurahan/Desa' &&
        nameLembaga.name != 'Mitra Agen CP' ? (
          <TouchableOpacity
            style={[styles.container, {paddingVertical: 3}]}
            onPress={() => {
              setRwVisible(true);
            }}>
            <View
              style={[
                styles.input,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: windowWidth * 0.89,
                },
              ]}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  color: '#26323880',
                }}>
                {nameLembaga.rw}
              </Text>
              <Icon name="chevron-down" color="#26323880" />
            </View>
          </TouchableOpacity>
        ) : null}
        {/* -----------------End Rw -------------- */}
        {/* ----------------- RT ----------------- */}
        {nameLembaga.name != 'Pilih Mitra Lembaga' &&
        nameLembaga.name != 'Mitra Provinsi' &&
        nameLembaga.name != 'Mitra Kementerian' &&
        nameLembaga.name != 'Mitra Kabupaten/Kota' &&
        nameLembaga.name != 'Mitra Kecamatan' &&
        nameLembaga.name != 'Mitra Kelurahan/Desa' &&
        nameLembaga.name != 'Mitra RW' &&
        nameLembaga.name != 'Mitra Agen CP' ? (
          <TouchableOpacity
            style={[styles.container, {paddingVertical: 3}]}
            onPress={() => {
              setRtVisible(true);
            }}>
            <View
              style={[
                styles.input,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: windowWidth * 0.89,
                },
              ]}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  color: '#26323880',
                }}>
                {nameLembaga.rt}
              </Text>
              <Icon name="chevron-down" color="#26323880" />
            </View>
          </TouchableOpacity>
        ) : null}
        {/* -----------------End RT -------------- */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (
              form.user_fullname != '' &&
              form.user_email != '' &&
              form.user_nohp != '' &&
              form.user_password != ''
            ) {
              registerLEmbaga(
                form.user_fullname.toLowerCase(),
                form.user_email.toLowerCase(),
                form.user_nohp,
                form.user_password.toLowerCase(),
                form.code_ref,
                formId.id_level,
                formId.id_prov,
                formId.id_kab,
                formId.id_kec,
                formId.id_kel,
                formId.id_rw,
                formId.id_rt,
                lat,
                long,
              );
            } else {
              alert('periksa lagi format yang anda masukan!');
            }
          }}>
          <Text style={[styles.fontReguler, {color: '#fff'}]}>Daftar</Text>
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.fontReguler}>atau gabung sebagai</Text>
        </View>

        <TouchableOpacity
          style={styles.buttonOutlin}
          onPress={() => {
            navigation.navigate('MitraUsaha');
          }}>
          <Text
            style={[
              styles.fontReguler,
              {color: '#51C091', marginLeft: 5, fontWeight: '600'},
            ]}>
            Mitra Usaha
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text>Sudah punya akun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Loginscreen')}>
            <Text
              style={[styles.fontReguler, {color: '#51C091', marginLeft: 5}]}>
              Masuk
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal visible={content} onDismiss={() => setContentModal(false)}>
        <View
          style={{
            backgroundColor: '#fff',
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 20,
            borderRadius: 10,
          }}>
          <Text
            style={{fontFamily: 'Poppins-SemiBold', fontSize: 16, margin: 5}}>
            {contentModal}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setContent(false);
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 16,
                margin: 5,
                color: '#51C091',
                marginBottom: -5,
              }}>
              Ok
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}>
        <FlatList
          data={lembaga}
          renderItem={({item, index}) => {
            return (
              <>
                <TouchableOpacity
                  style={styles.containerModal}
                  onPress={() => {
                    setNameLembaga({...nameLembaga, name: item.levelnama});
                    setVisible(false);
                    setFormID({...formId, id_level: item.id_level});
                  }}>
                  <Text>{item.levelnama}</Text>
                </TouchableOpacity>
              </>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </Modal>
      {/* --------------------- PRovinsi */}
      <Modal
        visible={onProvinsi}
        onDismiss={() => {
          setOnProvinsi(false);
        }}>
        <FlatList
          data={nameProvinsi}
          renderItem={({item, index}) => {
            return (
              <>
                <TouchableOpacity
                  style={styles.containerModal}
                  onPress={() => {
                    setOnProvinsi(false);
                    setNameLembaga({...nameLembaga, province: item.provinsi});
                    GetKabupaten(item.id_prov);
                    setFormID({...formId, id_prov: item.id_prov});
                  }}>
                  <Text>{item.provinsi}</Text>
                </TouchableOpacity>
              </>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </Modal>
      {/* ------------------- Modal Kota/Kabupaten */}
      <Modal
        visible={kotaVisible}
        onDismiss={() => {
          setKotaVisible(false);
        }}>
        <FlatList
          data={kabupaten}
          renderItem={({item, index}) => {
            return (
              <>
                <TouchableOpacity
                  style={styles.containerModal}
                  onPress={() => {
                    setKotaVisible(false);
                    GetKecamatan(item.id_kab);
                    setFormID({...formId, id_kab: item.id_kab});
                    setNameLembaga({
                      ...nameLembaga,
                      Kabupaten: item.kabupaten_kota,
                    });
                  }}>
                  <Text>{item.kabupaten_kota}</Text>
                </TouchableOpacity>
              </>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </Modal>
      {/* --------------------- Kecamatan */}
      <Modal
        visible={kecamVisible}
        onDismiss={() => {
          setKecamVisible(false);
        }}>
        <FlatList
          data={kecamatan}
          renderItem={({item, index}) => {
            return (
              <>
                <TouchableOpacity
                  style={styles.containerModal}
                  onPress={() => {
                    setKecamVisible(false);
                    setNameLembaga({...nameLembaga, kecamatan: item.kecamatan});
                    GetDesa(item.id_kec);
                    setFormID({...formId, id_kec: item.id_kec});
                  }}>
                  <Text>{item.kecamatan}</Text>
                </TouchableOpacity>
              </>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </Modal>
      {/* ----------------------rnd modal kecamatan =-------------------- */}
      {/* --------------------- Kelurahan ----------------------------------- */}
      <Modal
        visible={desaVisible}
        onDismiss={() => {
          setDesaVisible(false);
        }}>
        <FlatList
          data={desa}
          renderItem={({item, index}) => {
            return (
              <>
                <TouchableOpacity
                  style={styles.containerModal}
                  onPress={() => {
                    setDesaVisible(false);
                    GetDataRW(item.id_kel);
                    console.log(item.id_kel);
                    setFormID({...formId, id_kel: item.id_kel});
                    setNameLembaga({
                      ...nameLembaga,
                      kelurahan: item.kelurahan_desa,
                    });
                  }}>
                  <Text>{item.kelurahan_desa}</Text>
                </TouchableOpacity>
              </>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </Modal>
      {/* -------------------- end Kelurahan --------------------------------- */}
      {/* --------------------- RWwwwwww ----------------------------------- */}
      <Modal
        visible={rwVisible}
        onDismiss={() => {
          setRwVisible(false);
        }}>
        <FlatList
          data={dataRw}
          renderItem={({item, index}) => {
            return (
              <>
                <TouchableOpacity
                  style={styles.containerModal}
                  onPress={() => {
                    setRwVisible(false);
                    GetDataRT(item.id_rw);
                    setFormID({...formId, id_rw: item.id_rw});
                    setNameLembaga({
                      ...nameLembaga,
                      rw: item.nama_rw,
                    });
                  }}>
                  <Text>{item.nama_rw}</Text>
                </TouchableOpacity>
              </>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </Modal>
      {/* -------------------- end Rwwwwwwwwwwwwwwwwwww --------------------------------- */}
      {/* -------------------- rttttttttttttttttttt --------------------------------------- */}
      <Modal
        visible={rtVisible}
        onDismiss={() => {
          setRtVisible(false);
        }}>
        <FlatList
          data={dataRt}
          renderItem={({item, index}) => {
            return (
              <>
                <TouchableOpacity
                  style={styles.containerModal}
                  onPress={() => {
                    setRtVisible(false);
                    setNameLembaga({
                      ...nameLembaga,
                      rt: item.nama_rt,
                    });
                    setFormID({...formId, id_rt: item.id_rt});
                  }}>
                  <Text>{item.nama_rt}</Text>
                </TouchableOpacity>
              </>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </Modal>
      {/* --------------------------------------end rt -------------------------------- */}
      {loading == true ? <AppLoader /> : null}
    </>
  );
};

export default MitraLembaga;

const styles = StyleSheet.create({
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
    color: '#26323880',
    padding: 10,
    marginLeft: 5,
    width: windowWidth * 0.7,
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
  containerModal: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomColor: '#51C091',
    borderBottomWidth: 1,
  },
});

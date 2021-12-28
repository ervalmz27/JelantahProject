import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import Header from '../../component/Header';
import Upload from '../../../assets/Images/Icon/upload_img.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Modal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {IMAGE_URL} from '../../../config/env';
import {
  changePP,
  editDOB,
  editGender,
  editNama,
} from '../../../Apis/api/akun/profile';
import RNFetchBlob from 'rn-fetch-blob';
import DateTimePicker from '@react-native-community/datetimepicker';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const InfoPribadi = ({navigation}) => {
  const users = useSelector(state => state.users.login);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState(false);
  const [visible, setVisible] = useState(false);
  const [uploadPath, setuploadPath] = useState('');
  const [img, setImage] = useState({
    filePath: null,
    fileData: null,
    fileUri: null,
    pathDefault: '',
  });
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const [dataUsers, setDataUsers] = useState({});
  const [dataProfile, setDataProfile] = useState({
    user_nama: '',
    id_gender: 'Laki-Laki',
    tgl_lahir: 'belum diatur',
    changeName: false,
  });
  // const [uploadPath, setuploadPath] = useState('');
  useEffect(() => {
    users.forEach(el => {
      console.log('Rttttt -- >', el);
      setDataUsers(el);
      setImage({...img, pathDefault: `${IMAGE_URL}${dataUsers.user_urlpp}`});
      setDataProfile({...dataProfile, user_nama: el.user_fnama});
    });
    const willFocusSubscription = navigation.addListener('focus', () => {
      users;
    });

    return willFocusSubscription;
  }, [dataUsers]);

  const Camera = () => {
    let options = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      console.log('Response --------------------> ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        let path = response.assets;

        path.forEach((i, idx) => {
          const course = 'data:image/png;base64,' + i.base64;
          ChangePhoto(users[0].id_token, course);

          setImage({
            ...img,
            pathDefault: i.uri,
          });
        });
      }
    });
  };
  const ChangePhoto = async (id_token, image) => {
    const Response = await changePP(id_token, image);
    console.log('Response ---? ', Response.data);
  };

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

    // setSendTanggal(currentDate.getFullYear() + '/' + bln + '/' + tgl);
    setDataProfile({
      ...dataProfile,
      tgl_lahir: tgl + '/' + bln + '/' + currentDate.getFullYear(),
    });
    const tglLahir = currentDate.getFullYear() + '-' + bln + '-' + tgl;
    TanggalLahir(users[0].id_token, tglLahir);
  };

  const TanggalLahir = async (id_token, tgl_lahir) => {
    const Response = await editDOB(id_token, tgl_lahir);
    console.log('Response ----> ', Response.data);
  };

  const goLibraryCamera = () => {
    let options = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response --------------------> ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        let path = response.assets;

        path.forEach((i, idx) => {
          const course = 'data:image/png;base64,' + i.base64;
          ChangePhoto(users[0].id_token, course);

          setImage({
            ...img,
            pathDefault: i.uri,
          });
        });
      }
    });
  };
  const CangeGender = async (id_token, id_gender) => {
    const Response = await editGender(id_token, id_gender);
    console.log('Response ----> ', Response.data);
  };
  const ChangeName = async (id_token, user_nama) => {
    console.log('---------------id_token', id_token, 'user_nama', user_nama);
    const Response = await editNama(id_token, user_nama);
    console.log('Response ----> ', Response.data);
  };

  return (
    <>
      <Header
        name="Informasi Pribadi"
        icon="chevron-left"
        onClick={() => navigation.goBack()}
      />
      <SafeAreaView style={{backgroundColor: '#fff', height: windowHeight * 1}}>
        <View style={styles.profile}>
          <Image
            style={styles.ImageProfile}
            source={{
              uri: IMAGE_URL + dataUsers.user_urlpp,
            }}
          />
          <TouchableOpacity
            style={{position: 'absolute', bottom: 5, right: 137}}
            onPress={() => {
              setVisible(true);
            }}>
            <Upload height={40} width={40} />
          </TouchableOpacity>
        </View>
        {/* =========== Name ================= */}
        <View style={styles.container}>
          <View>
            <Text style={styles.Title}>Nama</Text>
            {/* <Text style={styles.Textcontent}>{}</Text> */}

            <TextInput
              editable={dataProfile.changeName}
              style={[
                styles.Textcontent,
                {
                  color: '#26323880',
                  marginLeft: -5,
                  marginTop: -5,
                  width: windowWidth * 0.7,
                  fontFamily: 'Poppins-SemiBold',
                },
              ]}
              onSubmitEditing={event => {
                ChangeName(dataUsers.id_token, dataProfile.user_nama);
              }}
              blurOnSubmit={false}
              autoFocus={true}
              value={dataProfile.user_nama}
              onChangeText={name => {
                setDataProfile({...dataProfile, user_nama: name});
              }}
            />
          </View>
          {dataProfile.changeName == false ? (
            <TouchableOpacity
              onPress={() => {
                setDataProfile({...dataProfile, changeName: true});
              }}>
              <Text style={styles.Title}>Ubah</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setDataProfile({...dataProfile, changeName: false});
                ChangeName(dataUsers.id_token, dataProfile.user_nama);
              }}>
              <Text style={styles.Title}>Simpan</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* =========== End Name =============== */}

        {/* ===========JEnins Kelamin =========== */}
        <View style={[styles.container, {paddingTop: -5}]}>
          <View>
            <Text style={styles.Title}>Jenis Kelamin</Text>
            <Text style={styles.Textcontent}>{dataProfile.id_gender}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setGender(true);
            }}>
            <Text style={styles.Title}>Ubah</Text>
          </TouchableOpacity>
        </View>
        {/* ============ End Jenis KElamin ========== */}
        {/* ============ Tanggal Lahir =============== */}
        <View style={styles.container}>
          <View>
            <Text style={styles.Title}>Tanggal Lahir</Text>
            <Text style={styles.Textcontent}>{dataUsers.tgl_lahir}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              showDatepicker();
            }}>
            <Text style={styles.Title}>Atur</Text>
          </TouchableOpacity>
        </View>
        {/*  ============= end Tanggal LAhir ======== */}
        {/* ============ Email =============== */}
        <View style={styles.container}>
          <View>
            <Text style={styles.Title}>Email</Text>
            <Text style={styles.Textcontent}>{dataUsers.user_email}</Text>
          </View>
          {/* <TouchableOpacity>
            <Text style={styles.Title}>Atur</Text>
          </TouchableOpacity> */}
        </View>
        {/*  ============= end Email ======== */}
        {/* ============ No Hp =============== */}
        <View style={styles.container}>
          <View>
            <Text style={styles.Title}>Nomor HP</Text>
            <Text style={styles.Textcontent}>{dataUsers.user_hp}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('cahngeHp');
            }}>
            <Text style={styles.Title}>Ubah</Text>
          </TouchableOpacity>
        </View>
        {/*  ============= end No HP ======== */}
        <View style={styles.container}>
          <View>
            <Text style={styles.Title}>Alamat</Text>
            <Text style={styles.Textcontent}>belum diatur</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.Title}>Atur</Text>
          </TouchableOpacity>
        </View>
        {/*  ============= end No HP ======== */}
      </SafeAreaView>
      <Modal
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        style={{position: 'absolute', marginTop: windowHeight * 0.88}}>
        <View style={styles.modalContainer}>
          <View style={styles.garis} />
          <View style={{padding: 24, flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => Camera()}>
              <Icon name="camera" size={34} color="#51C091" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={() => {
                goLibraryCamera();
              }}>
              <Icon name="images" size={34} color="#51C091" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={gender}
        onDismiss={() => {
          setGender(false);
        }}
        style={{marginTop: windowHeight * 0.84}}>
        <View style={[styles.modalContainer, {height: windowHeight * 0.3}]}>
          <View style={styles.garis} />
          <View>
            <Text style={styles.title}>Jenis Kelamin</Text>
            <TouchableOpacity
              style={styles.content}
              onPress={() => {
                setGender(false);
                setDataProfile({...dataProfile, id_gender: 'Laki - Laki'});
                CangeGender(dataUsers.id_token, 1);
              }}>
              <Text style={[styles.title, {fontSize: 14, fontWeight: '500'}]}>
                Laki - Laki
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.content, {borderBottomWidth: 0}]}
              onPress={() => {
                setGender(false);
                setDataProfile({...dataProfile, id_gender: 'Perempuan'});
                CangeGender(dataUsers.id_token, 2);
              }}>
              <Text style={[styles.title, {fontSize: 14, fontWeight: '500'}]}>
                Perempuan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    </>
  );
};

export default InfoPribadi;

const styles = StyleSheet.create({
  ImageProfile: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  profile: {padding: 20, justifyContent: 'center', alignItems: 'center'},
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Title: {
    fontFamily: 'Poppins-SemiBold',
  },
  Textcontent: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 24,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  garis: {
    borderTopWidth: 4,
    borderTopColor: '#26323833',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    marginHorizontal: windowWidth * 0.4,
  },
  content: {
    paddingVertical: 10,
    borderBottomColor: '#51C091',
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontStyle: 'normal',
    fontSize: 16,
    color: '#263238',
  },
});

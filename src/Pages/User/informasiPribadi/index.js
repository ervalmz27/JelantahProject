import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Header from '../../component/Header';
import Upload from '../../../assets/Images/Icon/upload_img.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Modal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {IMAGE_URL} from '../../../config/env';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const InfoPribadi = ({navigation}) => {
  const users = useSelector(state => state.users.login);
  // console.log('users --- > ', users);
  const [visible, setVisible] = useState(false);
  const [img, setImage] = useState({
    filePath: null,
    fileData: null,
    fileUri: null,
    pathDefault: 'https://reactnative.dev/img/tiny_logo.png',
  });

  const [dataUsers, setDataUsers] = useState({});

  useEffect(() => {
    users.forEach(el => {
      console.log('Rttttt -- >', el);
      setDataUsers(el);
    });
  }, []);

  const goCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // const source = {uri: response.uri};
        // console.log('response', JSON.stringify(response.assets));
        let path = response.assets;
        path.forEach((i, idx) => {
          setImage({
            ...img,
            pathDefault: i.uri,
          });
        });
      }
    });
  };
  const goLibraryCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        // console.log('response', JSON.stringify(response.assets));
        // let path = response.assets;
        path.forEach((i, idx) => {
          setImage({
            ...img,
            pathDefault: i.uri,
          });
        });
      }
    });
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
            <Text style={styles.Textcontent}>{dataUsers.user_fnama}</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.Title}>Ubah</Text>
          </TouchableOpacity>
        </View>
        {/* =========== End Name =============== */}

        {/* ===========JEnins Kelamin =========== */}
        <View style={styles.container}>
          <View>
            <Text style={styles.Title}>Jenis Kelamin</Text>
            <Text style={styles.Textcontent}>Laki-Laki</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.Title}>Ubah</Text>
          </TouchableOpacity>
        </View>
        {/* ============ End Jenis KElamin ========== */}
        {/* ============ Tanggal Lahir =============== */}
        <View style={styles.container}>
          <View>
            <Text style={styles.Title}>Tanggal Lahir</Text>
            <Text style={styles.Textcontent}>belum diatur</Text>
          </View>
          <TouchableOpacity>
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
          <TouchableOpacity>
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
            <TouchableOpacity onPress={() => goCamera()}>
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
    marginHorizontal: 135,
  },
});

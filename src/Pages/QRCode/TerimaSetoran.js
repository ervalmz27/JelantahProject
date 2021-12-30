import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../component/Header';
import User from '../../assets/Images/Icon/User.svg';
import Clarity from '../../assets/Images/Icon/clarity_house-line.svg';
import House from '../../assets/Images/Icon/House.svg';
import Recovery from '../../assets/Images/Icon/Recovery.svg';
import Tanggal from '../../assets/Images/Icon/Tanggal.svg';
import Jam from '../../assets/Images/Icon/Jam.svg';
import Timbangan from '../../assets/Images/Icon/Timbangan.svg';
import {act_setoran} from '../../Apis/api/qrcode';
import {useSelector} from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const TerimaSetoran = ({navigation, route}) => {
  const token = useSelector(state => state.users.login);
  const {dataSetoran, code_setoran} = route.params;
  console.log('dataSetoran', dataSetoran, code_setoran, '-------------', token);
  const [edit, setEdit] = useState(false);
  const [editBerat, setEditBerat] = useState('');
  useEffect(() => {
    setEditBerat(dataSetoran[0].qty);
    return () => {
      setEditBerat(dataSetoran[0].qty);
    };
  }, []);
  const postTerimaSetoran = async (
    code_setoran,
    id_token_from,
    id_token_to,
    limbah_kat_id,
    tanggal,
    jam,
    volume,
  ) => {
    const Response = await act_setoran(
      code_setoran,
      id_token_from,
      id_token_to,
      limbah_kat_id,
      tanggal,
      jam,
      volume,
    );
    console.log('Response', Response.data);
    if (Response.data.informasi[0].status == 'success') {
      navigation.navigate('terimajadwal');
    }
  };
  return (
    <>
      <Header
        name="Terima Setoran"
        icon="chevron-left"
        onClick={() => navigation.goBack()}
      />
      {/* style={{height: windowHeight * 1}} */}
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View style={styles.container}>
          <Text style={styles.header}>Cek kelengkapan setoran</Text>
          <Text
            style={[
              styles.header,
              {fontSize: 12, fontFamily: 'Poppins-Reguler', color: '#26323880'},
            ]}>
            Harap periksa dengan teliti isi setoran ini. Jika jumlah tidak
            sesuai, silakan hitung manual
          </Text>
          {/* User Name */}
          <View style={{marginTop: 15}}>
            <Text
              style={[
                styles.header,
                {
                  fontSize: 12,
                  fontFamily: 'Poppins-Reguler',
                  color: '#26323880',
                },
              ]}>
              Nama Penyetor
            </Text>
          </View>
          <View style={[styles.containerInput, {flexDirection: 'row'}]}>
            <View style={{marginTop: 15}}>
              <User height={20} width={20} />
            </View>
            <TextInput
              placeholder=" Nama Penyetor"
              style={styles.input}
              multiline={true}
              editable={false}
              value={dataSetoran[0].nama_penyetor}
              // onChangeText={event => {}}
            />
          </View>
          {/* End Userr */}
          {/* Alamat */}
          <View style={{marginTop: 15}}>
            <Text
              style={[
                styles.header,
                {
                  fontSize: 12,
                  fontFamily: 'Poppins-Reguler',
                  color: '#26323880',
                },
              ]}>
              Alamat Penyetor
            </Text>
          </View>
          <View style={[styles.containerInput, {flexDirection: 'row'}]}>
            <View style={{marginTop: 15}}>
              <Clarity height={20} width={20} />
            </View>
            <TextInput
              placeholder="Alamat Penyetor"
              style={styles.input}
              multiline={true}
              editable={false}
              value={dataSetoran[0].alamat_penyetor}
              // onChangeText={event => {}}
            />
          </View>
          {/* end Alamat */}
          {/* Setor Limbah */}
          <View style={{marginTop: 15}}>
            <Text
              style={[
                styles.header,
                {
                  fontSize: 12,
                  fontFamily: 'Poppins-Reguler',
                  color: '#26323880',
                },
              ]}>
              Setor ke Mitra
            </Text>
          </View>
          <View style={[styles.containerInput, {flexDirection: 'row'}]}>
            <View style={{marginTop: 15}}>
              <House height={20} width={20} />
            </View>
            <TextInput
              editable={false}
              placeholder="Setor ke Mitra"
              style={styles.input}
              multiline={true}
              value={dataSetoran[0].alamat_penerima}
              // onChangeText={event => {}}
            />
          </View>
          {/*end  Setor Limbah */}
          {/* Jenis Limbah */}
          <View style={{marginTop: 15}}>
            <Text
              style={[
                styles.header,
                {
                  fontSize: 12,
                  fontFamily: 'Poppins-Reguler',
                  color: '#26323880',
                },
              ]}>
              Jenis Limbah
            </Text>
          </View>
          <View style={[styles.containerInput, {flexDirection: 'row'}]}>
            <View style={{marginTop: 15}}>
              <Recovery height={20} width={20} />
            </View>
            <TextInput
              editable={false}
              placeholder="Jenis Limbah"
              style={styles.input}
              multiline={true}
              value={dataSetoran[0].jenis_limbah}
              // onChangeText={event => {}}
            />
          </View>
          {/* End Limbah */}
          <View style={{marginTop: 15}}>
            <Text
              style={[
                styles.header,
                {
                  fontSize: 12,
                  fontFamily: 'Poppins-Reguler',
                  color: '#26323880',
                },
              ]}>
              Tanggal Jadwal Setor
            </Text>
          </View>
          <View style={[styles.containerInput, {flexDirection: 'row'}]}>
            <View style={{marginTop: 15}}>
              <Tanggal height={20} width={20} />
            </View>
            <TextInput
              editable={false}
              placeholder="Tanggal Jadwal Setor"
              style={styles.input}
              multiline={true}
              value={dataSetoran[0].tanggal}
              // onChangeText={event => {}}
            />
          </View>
          {/* End Tanngal */}
          {/* Jam  */}
          <View style={{marginTop: 15}}>
            <Text
              style={[
                styles.header,
                {
                  fontSize: 12,
                  fontFamily: 'Poppins-Reguler',
                  color: '#26323880',
                },
              ]}>
              Waktu Jadwal Setor
            </Text>
          </View>
          <View style={[styles.containerInput, {flexDirection: 'row'}]}>
            <View style={{marginTop: 15}}>
              <Jam height={20} width={20} />
            </View>
            <TextInput
              editable={false}
              placeholder=" Waktu Jadwal Setor"
              style={styles.input}
              multiline={true}
              value={dataSetoran[0].jam}
              // onChangeText={event => {}}
            />
          </View>
          {/* End Waktu */}
          {/* Timbangan */}
          <View style={{marginTop: 15}}>
            <Text
              style={[
                styles.header,
                {
                  fontSize: 12,
                  fontFamily: 'Poppins-Reguler',
                  color: '#26323880',
                },
              ]}>
              Berat Limbah
            </Text>
          </View>
          <View
            style={[
              styles.containerInput,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <View>
              <Timbangan height={20} width={20} />
            </View>
            <TextInput
              placeholder="Berat Limbah"
              style={styles.input}
              editable={edit}
              focusable={edit}
              autoFocus={edit}
              multiline={true}
              value={editBerat}
              onChangeText={event => {
                setEditBerat(event);
              }}
            />
            <Text
              style={{
                color: '#51C091',
                marginLeft: -25,
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                letterSpacing: 0.5,
              }}>
              gram
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={{backgroundColor: '#fff'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log(
              '++++',
              code_setoran,
              dataSetoran[0].id_token_from,
              token[0].id_token,
              dataSetoran[0].tanggal,
              dataSetoran[0].jam,
              editBerat,
            );
            postTerimaSetoran(
              code_setoran,
              dataSetoran[0].id_token_from,
              token[0].id_token,
              1,
              dataSetoran[0].tanggal,
              dataSetoran[0].jam,
              editBerat,
            );
          }}>
          <Text style={[styles.fontReguler, {color: '#fff'}]}>
            Terima Setoran
          </Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: '#26323880',
              fontFamily: 'Poppins-Regular',
              fontWeight: '400',
              letterSpacing: 0.5,
            }}>
            Data tidak sesuai?
          </Text>
          <TouchableOpacity onPress={() => setEdit(!edit)}>
            <Text
              style={{
                color: '#51C091',
                fontFamily: 'Poppins-Regular',
                fontWeight: '400',
                letterSpacing: 0.5,
              }}>
              Hitung Manual
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default TerimaSetoran;

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#263238',
  },
  container: {
    padding: 15,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    width: windowWidth * 0.8,
    color: '#010101',
    padding: 10,
    marginLeft: 5,
    tintColor: '#aeaeae',
  },
  containerInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#51C091',
  },
  button: {
    backgroundColor: '#51C091',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 20,
  },
  fontReguler: {
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#51C091',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 20,
  },
});

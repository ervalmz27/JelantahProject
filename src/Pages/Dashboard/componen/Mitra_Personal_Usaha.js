import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import SetorLimbah from '../../../assets/Images/Icon/Trash.svg';
import TarikSaldo from '../../../assets/Images/Icon/TarikSaldo.svg';
import Laporan from '../../../assets/Images/Icon/Laporan.svg';
import JadwalSetor from '../../../assets/Images/Icon/JadwalSetor.svg';
import Coin from '../../../assets/Images/Icon/Coin.svg';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Mitra_Personal_Usaha = ({onSetor, cekJadwal, pressTarik}) => {
  return (
    <>
      <View style={styles.card}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            margin: 10,
          }}>
          <TouchableOpacity style={styles.eco} onPress={onSetor}>
            <SetorLimbah height={24} width={24} />
            <Text style={styles.font}>Setor Limbah</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.eco} onPress={pressTarik}>
            <TarikSaldo height={24} width={24} />
            <Text style={styles.font}>Tarik Saldo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.eco}>
            <Coin height={24} width={24} />
            <Text style={styles.font}>Tukar Poin</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            // margin: 10,
            marginTop: 10,
            width: windowWidth * 0.5,
            // marginRight: windowWidth * 0.8,
          }}>
          <TouchableOpacity
            style={[styles.eco, {marginRight: -10}]}
            onPress={cekJadwal}>
            <JadwalSetor height={24} width={24} />
            <Text style={styles.font}>Cek Jadwal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.eco, {marginRight: 90}]}>
            <Laporan height={24} width={24} />
            <Text style={styles.font}>Cek Laporan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Mitra_Personal_Usaha;

const styles = StyleSheet.create({
  //   content: {
  //     width: windowWidth * 0.9,

  //     padding: 10,
  //   },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 24,
    marginHorizontal: windowWidth * 0.05,
    padding: 10,
    shadowColor: '#000',
    width: windowWidth * 0.9,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  font: {
    fontFamily: 'Poppins-Reguler',
    fontSize: 12,
    fontWeight: '500',
    color: '#455A64B2',
    marginTop: 5,
  },
  eco: {
    flexDirection: 'column',
    alignItems: 'center',
    width: windowWidth * 0.3,
  },
});

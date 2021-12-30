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
import TerimaJadwal from '../../../assets/Images/Icon/TerimaJadwal.svg';
import TerimaSetoran from '../../../assets/Images/Icon/TerimaSetoran.svg';
import Laporan from '../../../assets/Images/Icon/Laporan.svg';
import JadwalSetor from '../../../assets/Images/Icon/JadwalSetor.svg';
import Coin from '../../../assets/Images/Icon/Coin.svg';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CardContent = ({onSetor, onJadwal, cekJadwal, pressTarik}) => {
  return (
    <>
      <View style={[styles.card, styles.content]}>
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
        <TouchableOpacity style={styles.eco} onPress={onJadwal}>
          <TerimaJadwal height={24} width={24} />
          <Text style={styles.font}>Terima Jadwal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eco}>
          <TerimaSetoran height={24} width={24} />
          <Text style={styles.font}>Terima Setoran</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eco} onPress={cekJadwal}>
          <JadwalSetor height={24} width={24} />
          <Text style={styles.font}>Cek Jadwal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.eco]}>
          <Laporan height={24} width={24} />
          <Text style={styles.font}>Cek Laporan</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CardContent;

const styles = StyleSheet.create({
  content: {
    width: windowWidth * 0.9,
    flexWrap: 'wrap',
    // marginTop: -45,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    marginHorizontal: 20,
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',

    width: 80,
    marginHorizontal: 3,
    borderRadius: 5,
    marginTop: 24,
    alignItems: 'center',

    shadowColor: '#000',
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
  eco: {flexDirection: 'column', alignItems: 'center', margin: 10},
});

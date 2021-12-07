import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Slider from '../../assets/Images/Header/Slider.svg';
import {Searchbar} from 'react-native-paper';
import Table from '../../assets/Images/table.svg';
import Premier from '../../assets/Images/Dashboard/premierleague.svg';
import Laliga from '../../assets/Images/Dashboard/laliga.svg';
import Seria from '../../assets/Images/Dashboard/seriea.svg';
import Bundes from '../../assets/Images/Dashboard/bundesliga.svg';
import Background from '../../assets/Images/jersey/Background.svg';
import Chelsea from '../../assets/Images/jersey/chelsea.svg';
import Juve from '../../assets/Images/jersey/juve.svg';
import Milan from '../../assets/Images/jersey/milan.svg';
import Liverpool from '../../assets/Images/jersey/liverpool.svg';
import {useDispatch, useSelector} from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Dashboar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const globalState = useSelector(state => state);
  console.log('username Terdaftar : ', globalState);
  const onChangeSearch = query => setSearchQuery(query);
  return (
    <>
      <ScrollView>
        <View style={styles.background}>
          <View style={styles.nav}>
            <Searchbar
              placeholder="Cari Jersey. . ."
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.searchBar}
            />
            <View style={styles.icon}>
              <Table width={24} height={24} />
            </View>
          </View>
          <View style={styles.slide}>
            <Slider width={windowWidth * 0.9} height={132} />
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.header}>Pilih Liga</Text>
        </View>
        <View style={styles.liga}>
          {/* Premier Liga */}
          <TouchableOpacity style={styles.card}>
            <Premier height={57} width={57} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Laliga height={57} width={57} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Seria height={57} width={57} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Bundes height={57} width={57} />
          </TouchableOpacity>
          {/* End Section Premier Liga */}
        </View>
        {/* Pilihan Jerseyyyy */}
        <View style={[styles.liga, {marginTop: 10}]}>
          <Text style={styles.header}>Pilih Jersey Yang Anda Inginkan</Text>
        </View>
        <View
          style={[
            styles.liga,
            {marginTop: 10, flexWrap: 'wrap', justifyContent: 'space-between'},
          ]}>
          {/* chelsea */}
          <View style={styles.jarak}>
            <Background width={150} height={180} />
            <View style={styles.jersey}>
              <Chelsea height={124} width={124} />
              <Text style={styles.textJersey}>Chelsea 3RD 2018-2019</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.TextButton}>Detail</Text>
            </TouchableOpacity>
          </View>

          {/* End Chelsea */}
          {/* Liverpool */}
          <View style={styles.jarak}>
            <Background width={150} height={180} />
            <View style={styles.jersey}>
              <Liverpool height={124} width={124} />
              <Text style={styles.textJersey}>Liverpool Away 2018-2019</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.TextButton}>Detail</Text>
            </TouchableOpacity>
          </View>
          {/* End Liverpool */}
          {/* Juve */}
          <View style={styles.jarak}>
            <Background width={150} height={180} />
            <View style={styles.jersey}>
              <Juve height={124} width={124} />
              <Text style={styles.textJersey}>Juve 3RD 2018-2019</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.TextButton}>Detail</Text>
            </TouchableOpacity>
          </View>
          {/* End Juve */}
          {/* Milan */}
          <View style={styles.jarak}>
            <Background width={150} height={180} />
            <View style={styles.jersey}>
              <Milan height={124} width={124} />
              <Text style={styles.textJersey}>Milan 3RD 2018-2019</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.TextButton}>Detail</Text>
            </TouchableOpacity>
          </View>
          {/* End Milan */}
        </View>
      </ScrollView>
    </>
  );
};

export default Dashboar;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#22668A',
    height: windowHeight * 0.19,
    alignItems: 'center',

    justifyContent: 'center',
  },
  searchBar: {
    width: windowWidth * 0.75,
    borderRadius: 5,
  },
  icon: {
    backgroundColor: '#fff',
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginLeft: 5,
  },
  nav: {
    flexDirection: 'row',
    marginTop: 40,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    marginTop: 80,
  },
  container: {
    marginHorizontal: 20,
    marginTop: 105,
  },
  liga: {
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  header: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    height: 80,
    width: 80,
    marginHorizontal: 3,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  jersey: {
    marginTop: -165,
    alignItems: 'center',
  },
  textJersey: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Lato-Bold',
    color: '#000',
    width: 90,
  },
  jarak: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    width: 150,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#22668A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextButton: {
    fontSize: 13,
    fontFamily: 'Lato-Bold',
    color: '#fff',
  },
});

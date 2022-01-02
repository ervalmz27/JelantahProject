import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Button, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
// import {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Header from '../../component/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const alamatMaps = ({navigation}) => {
  const [getlocation, setGetlocation] = useState({
    latitude: '',
    longitude: '',
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });
  useEffect(() => {
    MYlocation();
  }, []);

  const MYlocation = () => {
    Geolocation.getCurrentPosition(info => {
      console.log(info.coords);
      setGetlocation({
        ...getlocation,
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      });
    });
  };

  const mapRef = useRef(null);

  const gotLocation = () => {
    mapRef.current.animateToRegion(getlocation, 3 * 1000);
  };

  return (
    <>
      <Header
        name="Map Google"
        icon="chevron-left"
        onClick={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          // provider={PROVIDER_GOOGLE}  remove if not using Google Maps
          style={styles.map}
          initialRegion={{
            latitude: -6.9294723,
            longitude: 107.7071068,
            latitudeDelta: 0.0009,
            longitudeDelta: 0.0091,
          }}
          onRegionChangeComplete={region => setRegion(region)}>
          <Marker coordinate={getlocation} />
        </MapView>
        <View style={{position: 'absolute', bottom: windowHeight * 0.1}}>
          <View>
            <Text style={[styles.text, {color: '#263238'}]}>
              Current latitude: {region.latitude}
            </Text>
            <Text style={[styles.text, {color: '#263238'}]}>
              Current longitude: {region.longitude}
            </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => gotLocation()}>
            <Text style={styles.text}>Lokasi Saya</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default alamatMaps;

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: windowHeight * 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    height: 48,
    backgroundColor: '#51C091',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 16,
  },
});

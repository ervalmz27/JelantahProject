import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
// import {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
const alamatMaps = () => {
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
    longitudeDelta: 0.001,
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
      });
    });
  };

  const mapRef = useRef(null);

  const gotLocation = () => {
    mapRef.current.animateToRegion(getlocation, 3 * 1000);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        // provider={PROVIDER_GOOGLE}  remove if not using Google Maps
        style={styles.map}
        initialRegion={{
          latitude: -6.9294723,
          longitude: 107.7071068,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChangeComplete={region => setRegion(region)}>
        <Marker coordinate={getlocation} />
      </MapView>

      <Text style={styles.text}>Current latitude: {region.latitude}</Text>
      <Text style={styles.text}>Current longitude: {region.longitude}</Text>

      <View style={{marginVertical: 10}}>
        <Button onPress={() => gotLocation()} title="Go To  My Location" />
      </View>
    </View>
  );
};

export default alamatMaps;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

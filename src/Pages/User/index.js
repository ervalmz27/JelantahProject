import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const User = () => {
  return (
    <View style={styles.container}>
      <Text>Halaman not Found!</Text>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

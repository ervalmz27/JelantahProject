import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const Header = ({icon, name, onClick}) => {
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClick}>
          <Icon name={icon} size={15} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.textHeader}>{name}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#51C091',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  textHeader: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});

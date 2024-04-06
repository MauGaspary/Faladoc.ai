import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity>
        <Feather name="home" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather name="mic" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather name="user" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    paddingVertical: 10,
  },
});

export default Navbar;

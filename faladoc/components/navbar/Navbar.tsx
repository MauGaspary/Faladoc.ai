import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity>
        <Feather name="home" size={24} color="#12ADB4" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather name="mic" size={24} color="#12ADB4" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather name="user" size={24} color="#12ADB4" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
});

export default Navbar;

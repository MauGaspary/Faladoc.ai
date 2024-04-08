import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity>
        <Image
        source={require('../../assets/icons/Home Selected.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity>
      <Image
        source={require('../../assets/icons/icon _mic_.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity>
      <Image
        source={require('../../assets/icons/User Unselected.png')}
        />
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

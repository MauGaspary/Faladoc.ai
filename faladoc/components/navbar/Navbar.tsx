import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { House, Person, Mic } from 'react-bootstrap-icons';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity>
          <House size={36}/>
      </TouchableOpacity>

      <TouchableOpacity>
        <Mic size={36}/>
      </TouchableOpacity>

      <TouchableOpacity>
          <Person size={36}/>
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

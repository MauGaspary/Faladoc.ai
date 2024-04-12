import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IconName = 'home' | 'mic' | 'person';

const Navbar = () => {

  const [selectedIcon, setSelectedIcon] = useState('home');

  const handleIconPress = (iconName : IconName) => {
    setSelectedIcon(iconName);
  }

  return (
    <View className='flex-row justify-around items-center bg-[#FFFFFF] py-5 px-10 shadow-md absolute bottom-0 left-0 right-0 w-full'>
      <TouchableOpacity onPress={()=> handleIconPress('home')}>
        {selectedIcon === 'home' ? (
          <Ionicons name="home-sharp" size={35} color="#12ADB4" />
        ) : (
          <Ionicons name="home-outline" size={35} color="#12ADB4" />
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> handleIconPress('mic')}>
        {selectedIcon === 'mic' ? (
          <Ionicons name="mic-sharp" size={35} color="#12ADB4" />
        ) : (
          <Ionicons name="mic-outline" size={35} color="#12ADB4" />
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> handleIconPress('person')}>
        {selectedIcon === 'person' ? (
          <Ionicons name="person" size={35} color="#12ADB4" />
        ) : (
          <Ionicons name="person-outline" size={35} color="#12ADB4" />
        )}
      </TouchableOpacity>
    </View>
  );
};

// const styles = StyleSheet.create({
//   navbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     width: '100%',
//   },
// });

export default Navbar;

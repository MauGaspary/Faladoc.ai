import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingViewComponent, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IconName = 'home' | 'mic' | 'person';

const Navbar = () => {

  const [selectedIcon, setSelectedIcon] = useState('home');

  const handleIconPress = (iconName : IconName) => {
    setSelectedIcon(iconName);
  }

  return (
    <KeyboardAvoidingView className='flex-1'>

    <View className='flex-row justify-around items-center bg-[#F7FFFF] py-4 px-10 shadow-md absolute bottom-0 left-0 right-0 w-full'>
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
    </KeyboardAvoidingView>

  );
};

export default Navbar;

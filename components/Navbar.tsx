import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingViewComponent, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


type IconName = 'home' | 'mic' | 'person';

const Navbar = () => {

  type NavigationType = {
    navigate: (screen: string) => void;
  };
  
  const navigation = useNavigation<NavigationType>();
  
  const [selectedIcon, setSelectedIcon] = useState('home');

  const handleIconPress = (iconName: IconName, screenName: string) => {
    
    navigation.navigate(screenName);
    setSelectedIcon(iconName);
  }

  return (
    <KeyboardAvoidingView className='flex-1'>

    <View className='flex-row justify-around items-center bg-[#F7FFFF] py-4 px-8 shadow-md absolute bottom-0 left-0 w-full'>

      <TouchableOpacity onPress={()=> handleIconPress('home', 'Home')}>
        {selectedIcon === 'home' ? (
          <Ionicons name="home-sharp" size={35} color="#12ADB4" />
        ) : (
          <Ionicons name="home-outline" size={35} color="#12ADB4" />
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> handleIconPress('mic', 'Iniciar nova Consulta')}>
        {selectedIcon === 'mic' ? (
          <Ionicons name="mic-sharp" size={35} color="#12ADB4" />
        ) : (
          <Ionicons name="mic-outline" size={35} color="#12ADB4" />
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> handleIconPress('person', 'Home')}>
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

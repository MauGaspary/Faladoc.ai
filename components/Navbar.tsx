import React, { useState, useEffect } from 'react';
import { View, Pressable, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

type IconName = 'home' | 'mic' | 'person';

const Navbar = () => {
  type NavigationType = {
    navigate: (screen: string) => void;
  };

  const navigation = useNavigation<NavigationType>();
  const route = useRoute();
  const [selectedIcon, setSelectedIcon] = useState<IconName>('home');

  const handleIconPress = (iconName: IconName, screenName: string) => {
    navigation.navigate(screenName);
  };

  useFocusEffect(
    useCallback(() => {
      switch (route.name) {
        case 'Home':
          setSelectedIcon('home');
          break;
        case 'StartNewAppointment':
          setSelectedIcon('mic');
          break;
        case 'ViewPatients': 
          setSelectedIcon('person');
          break;
        default:
          setSelectedIcon('home');
      }
    }, [route.name])
  );

  return (
      <View className='flex-row justify-around items-center bg-[#F7FFFF] py-4 px-8 shadow-md absolute bottom-0 left-0 w-full'>
        <Pressable onPress={() => handleIconPress('home', 'Home')}>
          {selectedIcon === 'home' ? (
            <Ionicons name="home-sharp" size={35} color="#12ADB4" />
          ) : (
            <Ionicons name="home-outline" size={35} color="#12ADB4" />
          )}
        </Pressable>

        <Pressable onPress={() => handleIconPress('mic', 'StartNewAppointment')}>
          {selectedIcon === 'mic' ? (
            <Ionicons name="mic-sharp" size={35} color="#12ADB4" />
          ) : (
            <Ionicons name="mic-outline" size={35} color="#12ADB4" />
          )}
        </Pressable>

        <Pressable onPress={() => handleIconPress('person', 'ViewPatients')} >
          {selectedIcon === 'person' ? (
            <Ionicons name="person" size={35} color="#12ADB4" />
          ) : (
            <Ionicons name="person-outline" size={35} color="#12ADB4" />
          )}
        </Pressable>
      </View>
  );
};

export default Navbar;

import React from 'react';
import { View, Pressable, Dimensions } from 'react-native';
import AppText from './AppText'; // Assuming you have this component
import { Feather, Ionicons } from '@expo/vector-icons';

const ButtonsOnHome = ({ size, onPress, icon, text }: any) => {
  // Get the screen width
  const screenWidth = Dimensions.get('window').width;

  // Calculate the width in pixels (assuming 1rem = 16px, adjust as needed)
  const calculatedWidth = screenWidth * (9.5 * 16) / screenWidth; // Adjust this formula based on your design

  if (size == "full") return (
    <View className="h-32 w-full m-2 ">
      <Pressable onPress={onPress} className="rounded-lg py-6 bg-timer flex-row items-center justify-center">
        <AppText className="text-white text-2xl font-semibold mr-3">{text}</AppText>
        <Ionicons name={icon} size={60} color="white" />
      </Pressable>
    </View>
  );
  else return (
    <View>
      <Pressable onPress={onPress} style={{ width: calculatedWidth }} className="rounded-lg justify-center h-32 bg-timer items-center">
        <Ionicons name={icon} size={60} color="white" />
        <AppText className="text-white text-2xl font-semibold">{text}</AppText>
      </Pressable>
    </View>
  );
};

export default ButtonsOnHome;
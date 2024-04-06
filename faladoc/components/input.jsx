import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';




const Input = ({ iconName, placeholder }) => {
  return (
    <View className="flex-row br-15 border-2 border-blue-500 rounded-full p-3 m-3">
      <Ionicons name={iconName} size={24} color="black" className="mt-1 ml-2" />
      <TextInput
        className="flex-100 ml-200"
        placeholder={placeholder}
        placeholderTextColor="gray"
      />
    </View>
  );
};

export default Input;

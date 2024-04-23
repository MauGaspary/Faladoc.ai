import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Input = ({iconName, placeholder ,value, onChangeText}:any) => {
  const [text, setText] = useState('');
  return (
    <View className="flex-row border-2 border-lightGreen w-2/3 rounded-full p-3 m-3 bg-white">
      <Ionicons name={iconName} size={24} color="black" className="mt-1 ml-2" />
      <TextInput
        className="ml-2"
        placeholder={placeholder}
        placeholderTextColor="gray"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default Input;
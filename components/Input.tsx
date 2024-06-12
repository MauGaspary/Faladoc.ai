import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Input = ({iconName, placeholder ,value, onChangeText, variant}:any) => {
  const [text, setText] = useState('');
  return (
    <View className={`w-full flex-row border-2 rounded-full p-3 my-2 bg-white ${variant == 'error' ? 'border-invalid' : 'border-lightGreen'}`}>
      <Ionicons name={iconName} size={24} color="black" className="mt-1 ml-2" />
      <TextInput
        className="ml-2 text-subtitle w-full"
        placeholder={placeholder}
        placeholderTextColor="gray"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default Input;
import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';




const Input = ({ iconName, placeholder }) => {
  const [text, setText] = useState('');
  return (
    <View className="flex-row border-2 border-blue-500 rounded-full p-3 m-3">
      <Ionicons name={iconName} size={24} color="black" className="mt-1 ml-2" />
      <TextInput
        className="flex-100 ml-200"
        placeholder={placeholder}
        placeholderTextColor="gray"
        value={text}
        onChangeText={setText}
      />
    </View>
  );
};

export default Input;

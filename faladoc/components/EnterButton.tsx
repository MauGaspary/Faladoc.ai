import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';

const EnterButton = ({ onPress, text }: { onPress: () => void, text: string }) => {
    return (
      <TouchableOpacity onPress={onPress} className="flex-row rounded-full p-3  bg-teal-600 justify-center shadow-lg w-full">
        <View className="w-full justify-center items-center">
          <Text className="text-white mt-1 justify-center items-center">{text}</Text>
        </View>
      </TouchableOpacity>
      
    );
  };
  
  export default EnterButton;
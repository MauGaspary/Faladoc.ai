import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { Pressable } from 'react-native';
import AppText from "./AppText";

const EnterButton = ({ onPress, text }: { onPress: () => void, text: string }) => {
    return (
      <Pressable onPress={onPress} className="flex-row rounded-full p-3  bg-teal-600 justify-center shadow-lg w-full">
        <View className="w-full justify-center items-center">
          <AppText className="text-white mt-1 justify-center items-center">{text}</AppText>
        </View>
      </Pressable>
      
    );
  };

  export default EnterButton
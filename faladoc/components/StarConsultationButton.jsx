import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const StartConsultationButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="w-32 h-32 rounded-full bg-teal-600 justify-center items-center shadow-lg">
      <View className="items-center">
        <FontAwesome5 name="microphone" size={24} color="white" />
        <Text className="text-white mt-1 text-sm">Iniciar Consulta</Text>
      </View>
    </TouchableOpacity>
  );
};

export default StartConsultationButton;

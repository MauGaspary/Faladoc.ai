import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';


const StartConsultationButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} className="w-48 h-48 rounded-full bg-teal-600 justify-center items-center shadow-lg">
      <View className="items-center">
        <Ionicons name="mic-outline" size={64} color="white" />
        <Text className="text-white mt-2 text-lg">Iniciar Consulta</Text>
      </View>
    </TouchableOpacity>
    
  );
};

export default StartConsultationButton;

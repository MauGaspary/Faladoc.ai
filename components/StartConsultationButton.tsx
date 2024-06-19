import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import AppText from "./AppText";


const StartConsultationButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable onPress={onPress} className="w-48 h-48 rounded-full bg-teal-600 justify-center items-center shadow-lg">
      <View className="items-center">
        <Ionicons name="mic-outline" size={64} color="white" />
        <AppText className="text-white mt-2 text-lg">Iniciar Consulta</AppText>
      </View>
    </Pressable>
    
  );
};

export default StartConsultationButton;

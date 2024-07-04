import React from 'react';
import { Dimensions, Pressable, Text } from 'react-native';
import AppText from "./AppText";

const screenWidth = Dimensions.get('window').width;

// Calculate the width in pixels (assuming 1rem = 16px, adjust as needed)
const calculatedWidth = screenWidth * (20 * 16) / screenWidth; // Adjust this formula based on your design

const CancelConsultationButton = ( { onPress } ) => {
    return (
        <Pressable onPress={onPress} style={{ width: calculatedWidth}} className="mt-[50] items-center bg-[#FF6D4D] p-[10]">
            <AppText className="text-white text-lg">Cancelar Consulta</AppText>
        </Pressable>
    )
}

export { CancelConsultationButton }; 
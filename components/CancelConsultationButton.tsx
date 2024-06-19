import React from 'react';
import { Pressable, Text } from 'react-native';
import AppText from "./AppText";

const CancelConsultationButton = ( { onPress } ) => {
    return (
        <Pressable onPress={onPress} className="mt-[50] items-center bg-[#FF6D4D] p-[10] w-[320px]">
            <AppText className="text-white text-lg">Cancelar Consulta</AppText>
        </Pressable>
    )
}

export { CancelConsultationButton }; 
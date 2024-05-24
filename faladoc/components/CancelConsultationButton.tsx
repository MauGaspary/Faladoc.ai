import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CancelConsultationButton = ( { onPress } ) => {
    return (
        <TouchableOpacity onPress={onPress} className="mt-[50] items-center bg-[#FF6D4D] p-[10] w-[320px]">
            <Text className="text-white text-lg">Cancelar Consulta</Text>
        </TouchableOpacity>
    )
}

export { CancelConsultationButton }; 
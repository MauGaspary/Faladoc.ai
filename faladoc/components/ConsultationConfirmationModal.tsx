import React from 'react';
import { Modal, Text, View, Pressable } from 'react-native';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConsultationConfirmationModal: React.FC<Props> = ({ isVisible, onClose, onConfirm }) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-opacity-50">
        <View className="bg-white rounded-lg p-6">
          <Text className="text-lg font-bold mb-2 text-center">Confirmação de Consulta</Text>
          <Text className="text-base mb-6 text-center">Deseja realmente iniciar a consulta?</Text>
          <View className="flex flex-row justify-around">
            <Pressable onPress={onConfirm} className="bg-[#88D6D9] py-2 px-4 rounded-md">
              <Text className="text-white font-bold">Confirmar</Text>
            </Pressable>
            <Pressable onPress={onClose} className="bg-[#F17777] py-2 px-4 rounded-md">
              <Text className="text-white font-bold">Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConsultationConfirmationModal;



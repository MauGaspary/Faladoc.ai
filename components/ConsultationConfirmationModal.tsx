import React from 'react';
import { Modal, Text, View, Pressable } from 'react-native';
import AppText from "./AppText";

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
          <AppText className="text-lg font-bold mb-2 text-center">Confirmação de Consulta</AppText>
          <AppText className="text-base mb-6 text-center">Deseja realmente iniciar a consulta?</AppText>
          <View className="flex flex-row justify-around">
            <Pressable onPress={onConfirm} className="bg-[#88D6D9] py-2 px-4 rounded-md">
              <AppText className="text-white font-bold">Confirmar</AppText>
            </Pressable>
            <Pressable onPress={onClose} className="bg-[#F17777] py-2 px-4 rounded-md">
              <AppText className="text-white font-bold">Cancelar</AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConsultationConfirmationModal;



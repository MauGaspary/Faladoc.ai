import React from 'react';
import { Modal, Text, View, Pressable } from 'react-native';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const MicPermissionModal: React.FC<Props> = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center">
        <View className="bg-white border border-[#08979D] rounded-lg p-6 h-2/6 w-10/12 justify-center">
          <Text className="text-xl font-bold text-center">Por favor habilite o microfone para começar a consulta</Text>
          <View className="flex flex-col justify-around items-center mt-4">
            <Pressable onPress={onClose} className="bg-[#F17777] py-2 px-4 rounded-md mt-4">
              <Text className="text-white text-base">Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MicPermissionModal;

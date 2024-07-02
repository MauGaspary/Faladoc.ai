import { Modal, View, Pressable } from 'react-native';
import AppText from "./AppText";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text: string
  cancelButtonText: string
  submitButtonText: string
}

export const ConfirmationModal = ({ isVisible, onClose, onConfirm, text, cancelButtonText, submitButtonText }: Props) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center">
        <View className="bg-white border border-[#08979D] rounded-lg p-6 h-2/6 w-10/12 justify-center">
          <AppText className="text-xl font-bold text-center">{text}</AppText>
          <View className="flex flex-col justify-around items-center">
            <Pressable onPress={onConfirm} className="bg-[#E0D256] py-2 px-4 rounded-md mt-5 mb-5">
              <AppText className="text-white text-base">{submitButtonText}</AppText>
            </Pressable>
            <Pressable onPress={onClose} className="bg-[#F17777] py-2 px-4 rounded-md">
              <AppText className="text-white text-base">{cancelButtonText}</AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};




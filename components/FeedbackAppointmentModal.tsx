//@ts-nocheck
import React, { useState, useContext } from 'react';
import { Modal, View, Pressable, TouchableOpacity, TextInput } from 'react-native';
import AppText from "./AppText";
import RatingIcon from './RatingIcon';
import axios from 'axios';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  appointmentId: string; // Nova propriedade para receber o id do prontuário
}

const FeedbackAppointmentModal: React.FC<Props> = ({ isVisible, onClose, appointmentId }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(null);

  const handleRatingPress = (value) => {
    setRating({ value });
  };

  const handleSubmit = async () => {
    const data = {
      feedback_score: rating?.value || 0,
      feedback_text: feedback
    };

    try {
      const response = await axios.patch(`http://3.22.75.73:3000/appointments/${appointmentId}`, data, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      console.log(response);
      onClose();
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
    }
  };

  const handleCancel = () => {
    setFeedback('');
    setRating(null);
    onClose(); 
  };

  const renderRatingItems = () => {
    const emojis = [
      { imageSource: require('../assets/rating-icons/face_1.png'), backgroundColor: 'bg-[#F17777]' },
      { imageSource: require('../assets/rating-icons/face_2.png'), backgroundColor: 'bg-[#F1B277]' },
      { imageSource: require('../assets/rating-icons/face_3.png'), backgroundColor: 'bg-[#E0DA56]' },
      { imageSource: require('../assets/rating-icons/face_4.png'), backgroundColor: 'bg-[#A3E056]' },
      { imageSource: require('../assets/rating-icons/face_5.png'), backgroundColor: 'bg-[#1EF64E]' },
    ];

    return emojis.map((emoji, index) => (
      <View className="items-center" key={index}>
        <RatingIcon
          imageSource={emoji.imageSource}
          backgroundColor={emoji.backgroundColor}
          onPress={() => handleRatingPress(index + 1)}
          isSelected={rating?.value === index + 1}
        />
        {index === 0 && <AppText className="mt-1 text-sm mr-2">Ruim</AppText>}
        {index === 4 && <AppText className="mt-1 text-sm mr-2">Ótimo</AppText>}
      </View>
    ));
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-opacity-50">
        <View className="bg-white rounded-lg p-6 border border-[#069696]">
          <AppText className="text-lg font-bold mb-4 text-center">Nos dê a sua opinião!</AppText>
          <AppText className="text-base mb-2 text-center text-[#505050]">O que você achou do prontuário gerado?</AppText>
          <View className="flex flex-row justify-around mb-2">
            {renderRatingItems()}
          </View>
          <AppText className="text-base mb-2 ml-2 text-[#505050]">Conte-nos sobre a sua experiência!</AppText>
          <TextInput
            className="rounded-2xl px-4 py-2 mb-4 bg-[#C0E5E7] text-[#9D9D9D]" 
            multiline
            numberOfLines={6}
            placeholder="Escrever avaliação..."
            value={feedback}
            onChangeText={setFeedback}
          />
          <View className="flex flex-row justify-center">
            <TouchableOpacity
              onPress={handleCancel}
              className="bg-[#F17777] py-2 px-4 rounded-2xl mr-2 w-28 h-10 items-center justify-center"
            >
              <AppText className="font-medium text-white text-xl">Cancelar</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-[#12ADB4] py-2 px-4 rounded-2xl ml-2 w-28 h-10 items-center justify-center"
            >
              <AppText className="font-medium text-white text-xl">Enviar</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FeedbackAppointmentModal;

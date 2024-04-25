import React from 'react';
import { Modal, Text, View, Button } from 'react-native';

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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <View style={{ backgroundColor: "white", borderRadius: 10, padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" }}>Confirmação de Consulta</Text>
          <Text style={{ fontSize: 16, marginBottom: 20, textAlign: "center" }}>Deseja realmente iniciar a consulta?</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <Button title="Confirmar" onPress={onConfirm} />
            <Button title="Cancelar" onPress={onClose} color="#e71d36" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConsultationConfirmationModal;



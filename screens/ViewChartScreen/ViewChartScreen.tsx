import React, { useState, useEffect, useCallback } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  Pressable,
  TextInput,
  Modal,
  LayoutAnimation,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import Navbar from "../../components/Navbar";
import AppText from "../../components/AppText";
import { apiHandler } from "../../api";

export default function ViewChartScreen({ navigation }: any) {
  const route = useRoute();
  const { id } = route.params as { id: string };

  const calcularIdade = (dataNascimento: string) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const formatarData = (data: string) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const [patient, setPatient] = useState({ name: "", date_of_birth: "" });
  const [appointment, setAppointment] = useState({
    medical_record_final: "",
    medical_record_original: "",
    patient_id: "",
    appointment_date: "",
    appointment_status: "",
  });

  const idade = calcularIdade(patient.date_of_birth);
  const dataNascimentoFormatada = formatarData(patient.date_of_birth);

  const [diagnostico, setDiagnostico] = useState("");
  const [tempDiagnostico, setTempDiagnostico] = useState("");
  const [inputHeight, setInputHeight] = useState(0); // Novo estado para controlar a altura do TextInput

  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getAppointment();
  }, []);

  const getAppointment = async () => {
    try {
      const appointmentResponse = await apiHandler(`/appointments/${id}`, 'GET', 'application/json');
      console.log(appointmentResponse);

      const {
        appointment_date,
        appointment_status,
        medical_record_final,
        patient_id,
        medical_record_original,
      } = appointmentResponse.data;

      setAppointment({
        appointment_date: appointment_date,
        appointment_status: appointment_status,
        medical_record_final: medical_record_final,
        medical_record_original: medical_record_original,
        patient_id: patient_id,
      });

      console.log(medical_record_original);
      console.log(medical_record_final);

      const patientResponse = await apiHandler(`/patients/${appointmentResponse.data.patient_id}`, 'GET', 'application/json');
      setPatient(patientResponse.data);
      setDiagnostico(appointmentResponse.data.medical_record_final || "");
      setTempDiagnostico(appointmentResponse.data.medical_record_final || "");
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleConfirm = async () => {
    try {
      const updatedAppointment = {
        ...appointment,
        medical_record_final: tempDiagnostico,
      };
      await apiHandler(`/appointments/${id}`, 'PATCH', 'application/json', JSON.stringify(updatedAppointment));
      setDiagnostico(tempDiagnostico);
      setIsEditing(false);
      setIsEdited(false);
    } catch (error) {
      console.error("Erro ao atualizar consulta", error);
    }
  };

  const handleTextChange = (text: string) => {
    setTempDiagnostico(text);
    setIsEdited(true);
  };

  const handleContentSizeChange = useCallback((contentWidth, contentHeight) => {
    LayoutAnimation.easeInEaseOut();
    setInputHeight(contentHeight);
  }, []);

  const handleApprove = async () => {
    try {
      await apiHandler(`/appointments/${id}`, 'PATCH', 'application/json', JSON.stringify({
        appointment_status: "APPROVED"
      }));
      setAppointment((prev) => ({
        ...prev,
        appointment_status: "APPROVED",
      }));
    } catch (error) {
      console.error("Erro ao aprovar prontuário", error);
    }
  };

  const handleEvaluate = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-background rounded-t-3xl pt-2 max-w-full">
      <ScrollView className="pb-8 mt-10">
        <AppText className="text-2xl text-gray-700 leading-12 text-left ml-6">
          Informações da Consulta
        </AppText>

        <View className="flex-1 bg-[#D0EFF0] mx-6 justify-center mt-8">
          <View className="bg-white rounded-3xl">
            <AppText className="text-lg text-gray-500 ml-5 mt-5">
              Paciente: {patient.name ? patient.name : "carregando..."}{" "}
            </AppText>
            <AppText className="text-lg text-gray-500 ml-5 mt-3">
              Idade: {patient.date_of_birth && idade}
            </AppText>
            <AppText className="text-lg text-gray-500 ml-5 mt-3 mb-2">
              Data da Consulta: {appointment.appointment_date}
            </AppText>
          </View>
        </View>

        <View className="flex-column justify-between ">
          <View className="flex-row justify-between items-center">
            <AppText className="text-2xl text-gray-700 leading-12 text-left ml-6 mt-10">
              Prontuário
              <Pressable onPress={handleEdit} className="ml-2">
                <Ionicons name="pencil" size={30} color="#505050" />
              </Pressable>
            </AppText>
          </View>

          <View className="flex-1 bg-[#D0EFF0] mx-6 justify-center">
            <View className="h-auto bg-white rounded-3xl">
              {isEditing ? (
                <>
                  <TextInput
                    className="text-lg text-timer ml-5 mr-5 mt-3 mb-5 border border-gray-300 rounded px-2 py-1"
                    value={tempDiagnostico}
                    onChangeText={handleTextChange}
                    multiline
                    onContentSizeChange={(e) =>
                      handleContentSizeChange(
                        e.nativeEvent.contentSize.width,
                        e.nativeEvent.contentSize.height
                      )
                    }
                    style={{ height: Math.max(35, inputHeight) }} // Definindo a altura dinâmica
                  />
                  <Pressable
                    className={`mt-3 p-2 rounded ${
                      isEdited ? "bg-gray-700" : "bg-gray-300"
                    }`}
                    onPress={handleConfirm}
                    disabled={!isEdited}
                  >
                    <AppText className="text-black text-center bg-[#D0EFF0]">
                      Confirmar
                    </AppText>
                  </Pressable>
                </>
              ) : (
                <AppText className="text-lg text-timer ml-5 mr-5 mt-3 mb-5">
                  {diagnostico}
                </AppText>
              )}
            </View>
          </View>
          </View>

        <View>
          {appointment.appointment_status === "WAITING_APPROVAL" && (
            <Pressable
              className="mt-10 flex-row rounded-full p-3 bg-teal-600 justify-center shadow-lg w-full"
              onPress={handleApprove}
            >
              <View className="w-full justify-center items-center">
                <Text className="text-white">Aprovar Prontuário</Text>
              </View>
            </Pressable>
          )}

          <Pressable
            className="mt-6 flex-row rounded-full p-3 bg-teal-600 justify-center shadow-lg w-full"
            onPress={handleEvaluate}
          >
            <View className="w-full justify-center items-center">
              <Text className="text-white">Avaliar o prontuário gerado</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-10 rounded-3xl w-3/4">
            <Text className="text-xl mb-4">Avaliação do Prontuário</Text>
            <Pressable onPress={handleCloseModal}>
              <Text className="text-blue-500">Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Navbar />
    </KeyboardAvoidingView>
  );
}
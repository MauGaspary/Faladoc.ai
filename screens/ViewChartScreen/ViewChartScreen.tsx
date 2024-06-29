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
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import Navbar from "../../components/Navbar";
import AppText from "../../components/AppText";
import FeedbackAppointmentModal from "../../components/FeedbackAppointmentModal";

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
  const [inputHeight, setInputHeight] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showingOriginal, setShowingOriginal] = useState(false);

  useEffect(() => {
    getAppointment();
  }, []);

  const getAppointment = async () => {
    try {
      const appointmentResponse = await axios.get(
        `http://3.22.75.73:3000/appointments/${id}`
      );

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

      const patientResponse = await axios.get(
        `http://3.22.75.73:3000/patients/id/${appointmentResponse.data.patient_id}`
      );
      setPatient(patientResponse.data);

      // Set the initial diagnostic text to medical_record_original
      setDiagnostico(medical_record_original || "");
      setTempDiagnostico(medical_record_final || "");
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
      await axios.patch(
        `http://3.22.75.73:3000/appointments/${id}`,
        updatedAppointment
      );
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
      await axios.patch(`http://3.22.75.73:3000/appointments/${id}`, {
        appointment_status: "APPROVED",
      });
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

  const toggleProntuario = () => {
    if (showingOriginal) {
      setDiagnostico(appointment.medical_record_final);
      setTempDiagnostico(appointment.medical_record_final);
      setIsEditing(false);
    } else {
      setDiagnostico(appointment.medical_record_original);
    }
    setShowingOriginal(!showingOriginal);
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

        <View className="flex-column justify-between">
          <View className="flex-row items-center justify-between mb-2">
            <AppText className="text-2xl text-gray-700 leading-12 text-left ml-6 mt-10 w-full">
              Prontuário
            </AppText>
            {!showingOriginal && (
                <Pressable onPress={handleEdit} className=" ml-8 flex-row mt-10 mr-6">
                  <AppText className="text-2xl text-gray-700 underline">Editar</AppText>
                  <Ionicons name="pencil" size={30} color="#505050" />
                </Pressable>
              )}
          </View>

          <View className="flex-1 bg-[#D0EFF0] mx-6 justify-center">
            <View className="h-auto bg-white rounded-3xl">
              {showingOriginal ? (
                <AppText className="text-lg text-timer ml-5 mr-5 mt-3 mb-5">
                  {diagnostico}
                </AppText>
              ) : (
                <>
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
                        style={{ height: Math.max(35, inputHeight) }}
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
                </>
              )}
            </View>
          </View>
        </View>

        <View className="items-center">
          <Pressable
            className="mt-6 flex-row rounded-full p-3 bg-teal-600 justify-center shadow-lg w-2/3"
            onPress={toggleProntuario}
          >
            <View className="w-full justify-center items-center">
              <Text className="text-white">
                {showingOriginal ? "Ver prontuário atual" : "Ver prontuário original"}
              </Text>
            </View>
          </Pressable>

          {appointment.appointment_status === "WAITING_APPROVAL" && (
            <Pressable
              className="mt-10 flex-row rounded-full p-3 bg-teal-600 justify-center shadow-lg w-2/3"
              onPress={handleApprove}
            >
              <View className="w-full justify-center items-center">
                <Text className="text-white">Aprovar Prontuário</Text>
              </View>
            </Pressable>
          )}

          <Pressable
            className="mt-6 flex-row rounded-full p-3 bg-[#438FE9] justify-center shadow-lg w-2/3"
            onPress={handleEvaluate}
          >
            <View className="w-full justify-center items-center">
              <Text className="text-white">Avaliar o prontuário gerado</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>

      <FeedbackAppointmentModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
      >
      </FeedbackAppointmentModal>

      <Navbar />
    </KeyboardAvoidingView>
  );
}

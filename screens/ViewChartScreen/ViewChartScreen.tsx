import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import Navbar from "../../components/Navbar";
import AppText from "../../components/AppText";

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
    patient_id: "",
    appointment_date: "",
  });

  const idade = calcularIdade(patient.date_of_birth);
  const dataNascimentoFormatada = formatarData(patient.date_of_birth);

  const [diagnostico, setDiagnostico] = useState("");
  const [tempDiagnostico, setTempDiagnostico] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    getAppointment();
  }, []);

  const getAppointment = async () => {
    try {
      const appointmentResponse = await axios.get(
        `http://3.22.75.73:3000/appointments/${id}`
      );
      setAppointment(appointmentResponse.data); //isso aqui nao ta funcionando - appointment continua null

      const patientResponse = await axios.get(
        `http://3.22.75.73:3000/patients/id/${appointmentResponse.data.patient_id}`
      );
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
      </ScrollView>
      <Navbar />
    </KeyboardAvoidingView>
  );
}

import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import { useRoute } from "@react-navigation/native";



export default function ViewChart({ navigation }: any) {

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
  const [appointment, setAppointment] = useState({ medical_record_final: "", patient_id: "", appointment_date: "" });

  const idade = calcularIdade(patient.date_of_birth);
  const dataNascimentoFormatada = formatarData(patient.date_of_birth);

  const [diagnostico, setDiagnostico] = useState("Hipertensão arterial. Diabetes tipo 2.");
  const [tempDiagnostico, setTempDiagnostico] = useState(diagnostico);
  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentResponse = await axios.get(`http://localhost:3000/appointments/${id}`);
        setAppointment(appointmentResponse.data);
      
        const patientResponse = await axios.get(`http://localhost:3000/patient/${appointmentResponse.data.patient_id}`);
        setPatient(patientResponse.data);
        setDiagnostico(appointmentResponse.data.medical_record_final);
        setTempDiagnostico(appointmentResponse.data.medical_record_final);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleConfirm = async () => {
    try {
      const updatedAppointment = { ...appointment, medical_record_final: tempDiagnostico };
      await axios.patch(`http://localhost:3000/appointments/${id}`, updatedAppointment);
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
    <KeyboardAvoidingView className="flex-1 bg-background rounded-t-3xl pt-2 max-w-full px-4">
      <ScrollView className="pb-8 mt-10">
        <Text className="text-2xl text-gray-700 leading-12 text-left ml-8">
          Informações de Consulta
        </Text>
        <View className="flex-1 bg-[#D0EFF0] items-center justify-center mt-8">
          <View className="w-72 h-48 bg-white rounded-3xl">
            <Text className="text-sm text-gray-500 ml-5 mt-5">Nome</Text>
            <Text className="text-sm text-timer ml-5">{patient.name?  patient.name : 'carregando...'}</Text>
            <Text className="text-sm text-gray-500 ml-5 mt-3">Idade</Text>
            <Text className="text-sm text-timer ml-5">{patient.date_of_birth && idade}</Text>
            <Text className="text-sm text-gray-500 ml-5 mt-3">
              Data de Nascimento
            </Text>
            <Text className="text-sm text-timer ml-5">
              { patient.date_of_birth && dataNascimentoFormatada }
            </Text>
          </View>
        </View>

        <Text className="text-2xl text-gray-700 leading-12 text-left ml-8 mt-10">
          Prontuário
        </Text>

        <View className="flex-1 bg-[#D0EFF0] items-center justify-center mt-8">
          <View className="w-72 h-auto bg-white rounded-3xl">
            <View className="flex-col ml-56 mt-5">
              <TouchableOpacity onPress={handleEdit}>
                <Ionicons name="pencil" size={24} color="#505050"/>
              </TouchableOpacity>
            </View>
            {isEditing ? (
              <>
                <TextInput
                  className="text-xs text-timer ml-5 mr-5 mt-3 mb-5 border border-gray-300 rounded px-2 py-1"
                  value={tempDiagnostico}
                  onChangeText={handleTextChange}
                  multiline
                />
                <TouchableOpacity
                  className={`mt-3 p-2 rounded ${isEdited ? 'bg-gray-700' : 'bg-gray-300'}`}
                  onPress={handleConfirm}
                  disabled={!isEdited}
                >

                <Text className="text-white text-center">Confirmar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text className="text-xs text-timer ml-5 mr-5 mt-3 mb-5">
                {diagnostico}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

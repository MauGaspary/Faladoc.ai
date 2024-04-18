import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import Input from "../../components/Input";
import StartConsultationButton from "../../components/StartConsultationButton";
import { AddPatientModal } from "../../components/AddPatientModal";
import Navbar from "../../components/Navbar";
import { FilterInput } from "../../components/FilterInput";
import SessionContext from "../../provider/sessionContext";
import axios from "axios";

const IniciarNovaConsultaScreen = ({ navigation }: any) => {
  const {
    appoitmentInfos,
    setAppoitmentInfos,
    patientInfo,
    loggedDoctor,
  } = useContext(SessionContext);

  const isInputsFilled =
    appoitmentInfos.hospital.length >= 2 &&
    appoitmentInfos.contexto.length >= 2;

  const handleLocation = (text: string) => {
    setAppoitmentInfos({
      ...appoitmentInfos,
      hospital: text,
    });
  };

  const handleContext = (text: string) => {
    setAppoitmentInfos({
      ...appoitmentInfos,
      contexto: text,
    });
  };

  const handleStartRecording = async () => {
    if (isInputsFilled) {
      const appoitment = {
        patient_id: patientInfo.id,
        doctor_id: loggedDoctor,
        hospital: appoitmentInfos.hospital,
        appointment_context: appoitmentInfos.contexto,
      };

      try {
        // const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/patients`, patient);
        const response = await axios.post(
          `http://localhost:3000/appointments`,
          appoitment
        );
        if (response.status !== 201) {
          throw new Error("Failed to create appointment");
        }

        setAppoitmentInfos({
          ...appoitmentInfos,
          id: response.data.id,
          duration: response.data.duration,
        });
      } catch (error) {
        console.error(error);
      }
      navigation.navigate("Consulta Andamento");
    } else {
      alert("Por favor, preencha os campos com pelo menos duas letras.");
    }
  };

  return (
    <KeyboardAvoidingView className="flex-1">
      <ScrollView className="h-full flex align-bottom" contentContainerStyle={{ flexGrow: 2 }}>
        <View className="flex-1 bg-[#D0EFF0] items-center justify-center pt-12">
          <AddPatientModal />
          <Text className="mt-2">ou</Text>
          <Text className="mt-2 mb-2">pesquise pelo nome</Text>
          <FilterInput />

          <View className="border-b-2 border-teal-600 w-4/5 my-2" />

          <Input
            iconName={"location-sharp"}
            placeholder={"Local da consulta"}
            value={appoitmentInfos.hospital}
            onChangeText={handleLocation}
          />

          <Input
            iconName={"list-outline"}
            placeholder={"Contexto da Consulta"}
            value={appoitmentInfos.contexto}
            onChangeText={handleContext}
          />

          <View className="pt-2">
            <StartConsultationButton onPress={handleStartRecording} />
          </View>

          <StatusBar style="auto" />
        </View>
      </ScrollView>
      <Navbar />
    </KeyboardAvoidingView>
  );
};

export default IniciarNovaConsultaScreen;

import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import Input from "../../components/Input";
import StartConsultationButton from "../../components/StartConsultationButton";
import { AddPatientModal } from "../../components/AddPatientModal";
import ConsultationConfirmationModal from "../../components/ConsultationConfirmationModal";
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

  const [isModalVisible, setModalVisible] = useState(false);

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

  const handleConfirmConsultation = async () => {

    const appoitment = {
      patient_id: patientInfo.id,
      doctor_id: loggedDoctor,
      hospital: appoitmentInfos.hospital,
      appointment_context: appoitmentInfos.contexto,
    };
  
    navigation.navigate("Consulta Andamento");
    setModalVisible(false);

    try {
      const response = await axios.post(`http://localhost:3000/appointments`, appoitment);
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
  };

  const handleStartRecording = async () => {
    setModalVisible(true);
  };

  return (
    <KeyboardAvoidingView className="flex-1">
      <ScrollView className="flex align-bottom" contentContainerStyle={{ flexGrow: 2 }}>

        <View className="flex-1 bg-[#D0EFF0] items-center justify-center pt-12">
          <AddPatientModal />

          <Text className="mt-3">ou</Text>
          <Text className="mt-1 mb-3">Pesquise pelo Nome</Text>

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

          <View className="mt-3">
            <StartConsultationButton onPress={handleStartRecording} />
          </View>

          <StatusBar style="auto" />
        </View>
      </ScrollView>
      <Navbar />
      <ConsultationConfirmationModal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleConfirmConsultation}
        />

    </KeyboardAvoidingView>
  );
};

export default IniciarNovaConsultaScreen;

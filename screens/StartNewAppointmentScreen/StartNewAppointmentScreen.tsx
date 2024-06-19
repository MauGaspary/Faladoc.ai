import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
import Input from "../../components/Input";
import StartConsultationButton from "../../components/StartConsultationButton";
import { AddPatientModal } from "../../components/AddPatientModal";
import ConsultationConfirmationModal from "../../components/ConsultationConfirmationModal";
import Navbar from "../../components/Navbar";
import { FilterInput } from "../../components/FilterInput";
import SessionContext from "../../provider/sessionContext";
import AppText from "../../components/AppText";
import axios from "axios";

const StartNewAppointmentScreen = ({ navigation }: any) => {
  const [isPatientSelected, setIsPatientSelected] = useState(true);

  const { appoitmentInfos, setAppoitmentInfos, patientInfo, doctorInfo } =
    useContext(SessionContext);

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

  useEffect(() => {
    if (patientInfo.id) {
      setIsPatientSelected(true);
    }
  }, [patientInfo]);

  const handleStartRecording = async () => {
    const appoitment = {
      patient_id: patientInfo.id,
      doctor_id: doctorInfo.id,
      hospital: appoitmentInfos.hospital,
      appointment_context: appoitmentInfos.contexto,
    };

    try {
      const response = await axios.post(
        `http://3.22.75.73:3000/appointments`,
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
      
      setModalVisible(false);
      
      navigation.navigate("OngoingAppointment");
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalRecording = async () => {
    if (!patientInfo.id) {
      setIsPatientSelected(false);
      return;
    }
    setModalVisible(true);
  };

  return (
    <KeyboardAvoidingView className="h-full">
      <View className="h-full bg-background items-center justify-center px-4">
        <AddPatientModal />

        <AppText className="mt-3">ou</AppText>
        <AppText className="mt-1 mb-3">Pesquise pelo Nome</AppText>

        <FilterInput isPatientSelected={isPatientSelected} />

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
          <StartConsultationButton onPress={handleModalRecording} />
        </View>

        <StatusBar style="auto" />
      </View>
      <Navbar />
      <ConsultationConfirmationModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleStartRecording}
      />
    </KeyboardAvoidingView>
  );
};

export default StartNewAppointmentScreen;

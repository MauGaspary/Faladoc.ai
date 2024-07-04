// @ts-nocheck
import { Text, TextInput, View } from "react-native";
import React, { useContext, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { ScrollView, Pressable } from "react-native";
import SessionContext from "../provider/sessionContext";
import { PatientDTO } from "../types/PatientDTO";

import AppText from "./AppText";
type FilterInputType = {
  isPatientSelected: boolean
};

export function FilterInput({ isPatientSelected }: FilterInputType) {
  const [searchTerm, setSearchTerm] = useState("");
  const { patientInfo, setPatientInfo, doctorInfo } = useContext(SessionContext);
  const [patients, setPatients] = useState<PatientDTO[]>([]);
  const timeoutId = useRef(null);

  const handleSearch = (text: string) => {
    setSearchTerm(text);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }


    timeoutId.current = setTimeout(async () => {
      if (text.length >= 1) {
        try {
          const response = await axios.get(
            // `${process.env.EXPO_PUBLIC_API_URL}/patients/${text}`
            `http://3.22.75.73:3000/patients?name=${text}&doctor_id=${doctorInfo.id}`
          );
          setPatients(response.data);
        } catch (error) {
          console.error("Failed to fetch data:", error);
          setPatients([]);
        }
      }
    }, 500);
  };

  const selectPatient = (patient: PatientDTO) => {
    setPatientInfo(patient);
    setSearchTerm("");
    setPatients([]);
  };

  return (
    <>
      <View className={`border-2 rounded-[1.875rem] py-3 px-4 mb-3 w-full flex-col items-left bg-white ${isPatientSelected ? 'border-lightGreen' : 'border-invalid'}`}>
        {patientInfo.name !== "" ? (
          <View className="flex-auto flex-row justify-between items-center">

            <AppText>{patientInfo.name}</AppText>
            <Pressable onPress={() => setPatientInfo({
              id: "",
              name: "",
              cpf: "",
              date_of_birth: "",
            })}>
              <AntDesign name="close" size={24} color="black" className="ml-2" />
            </Pressable>
          </View>
        ) : (
          <>
            <View className="flex flex-row">
              <AntDesign name="user" size={24} color="black" className="mr-2" />
              <TextInput
                className="ml-2 text-gray w-full"
                placeholder="Pesquisar paciente"
                placeholderTextColor="gray"
                value={searchTerm}
                onChangeText={handleSearch}
              />
            </View>

            {searchTerm !== "" && (
              <ScrollView
                className="w-full mt-1 border-t border-lightGreen max-h-32"
                showsVerticalScrollIndicator={false}
              >
                {patients.length ? (
                  patients.map((patient) => (
                    <Pressable
                      className="w-full border-b border-lightGreen"
                      onPress={() => selectPatient(patient)}
                      key={patient.id}
                    >
                      <AppText className="ml-7">Nome: {patient.name}</AppText>
                      <AppText className="ml-7">CPF: {patient.cpf}</AppText>
                    </Pressable>
                  ))
                ) : (
                  <AppText className="my-1 w-[190px] text-nowrap">
                    Nenhum paciente encontrado
                  </AppText>
                )}
              </ScrollView>
            )}
          </>
        )}
      </View>
      {
        !isPatientSelected && <AppText className="text-invalid px-10">Selecione paciente</AppText>
      }
    </>

  );
}

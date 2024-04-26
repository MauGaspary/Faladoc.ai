// @ts-nocheck
import { Text, TextInput, View } from "react-native";
import React, { useContext, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import SessionContext from "../provider/sessionContext";
import { PatientDTO } from "../types/PatientDTO";
type FilterInputType = {
  isPatientSelected: boolean
};

export function FilterInput({ isPatientSelected }: FilterInputType) {
  const [searchTerm, setSearchTerm] = useState("");
  const { patientInfo, setPatientInfo } = useContext(SessionContext);
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
            `http://localhost:3000/patients/${text}`
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

  console.log(isPatientSelected);

  return (
    <>
      <View className={`border-2 rounded-[30px] py-3 px-4 mb-3 w-2/3 flex-col items-left bg-white ${isPatientSelected ? 'border-lightGreen' : 'border-invalid'}`}>
        {patientInfo.name !== "" ? (
          <View className="flex-auto flex-row justify-between items-center">

            <Text>{patientInfo.name}</Text>
            <TouchableOpacity onPress={() => setPatientInfo({
              id: "",
              name: "",
              cpf: "",
              date_of_birth: "",
            })}>
              <AntDesign name="close" size={24} color="black" className="ml-2" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View className="flex flex-row">
              <AntDesign name="user" size={24} color="black" className="mr-2" />
              <TextInput
                className="ml-2 text-gray"
                placeholder="Pesquisar paciente..."
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
                    <TouchableOpacity
                      className="w-full border-b border-lightGreen"
                      onPress={() => selectPatient(patient)}
                      key={patient.id}
                    >
                      <Text className="ml-7">Nome: {patient.name}</Text>
                      <Text className="ml-7">CPF: {patient.cpf}</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text className="my-1 w-[190px] text-nowrap">
                    Nenhum paciente encontrado
                  </Text>
                )}
              </ScrollView>
            )}
          </>
        )}
      </View>
      {
        !isPatientSelected && <Text className="text-invalid px-10">Selecione paciente</Text>
      }
    </>

  );
}

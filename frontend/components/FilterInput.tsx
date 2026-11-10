// @ts-nocheck
import { Text, TextInput, View } from "react-native";
import React, { useContext, useRef, useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { ScrollView, Pressable } from "react-native";
import SessionContext from "../provider/sessionContext";
import { PatientDTO } from "../types/PatientDTO";

import AppText from "./AppText";
type FilterInputType = {
  isPatientSelected: boolean
};

interface Patient {
  id: string;
  date_of_birth: string;
  name: string;
  cpf: string;
}


export function FilterInput({ isPatientSelected }: FilterInputType) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { patientInfo, setPatientInfo, doctorInfo } = useContext(SessionContext);
  const timeoutId = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://3.22.75.73:3000/patients/doctor/${doctorInfo.id}`
      );
      const data = await response.data;
      setPatients(data);
      setFilteredPatients(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  
  useEffect(() => {
    handleSearch();
  }, [searchTerm, patients]);

  const normalizeString = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearch = () => {
    const normalizedSearchTerm = normalizeString(searchTerm.toLowerCase());
    const filtered = patients.filter((patient) => {
      const normalizedPatientName = normalizeString(
        patient?.name?.toLowerCase()
      );

      return normalizedPatientName.includes(normalizedSearchTerm); 
    });

    setFilteredPatients(filtered);
  };


  const selectPatient = (patient: PatientDTO) => {
    setPatientInfo(patient);
    setSearchTerm("");
    setPatients([]);
    setFilteredPatients([]);
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
                onChangeText={setSearchTerm}
              />
            </View>

            {searchTerm !== "" && (
              <ScrollView
                className="w-full mt-1 border-t border-lightGreen max-h-32"
                showsVerticalScrollIndicator={false}
              >
                {filteredPatients.length ? (
                  filteredPatients.map((patient) => (
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
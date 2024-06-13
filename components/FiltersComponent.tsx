// @ts-nocheck
import React, { useContext, useRef, useState, useEffect } from "react";
import { Text, TextInput, View, ScrollView, TouchableOpacity, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import * as Calendar from 'expo-calendar';
import SessionContext from "../provider/sessionContext";
import { PatientDTO } from "../types/PatientDTO";
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

type FiltersComponentType = {
  isPatientSelected: boolean
};

export function FiltersComponent({ isPatientSelected }: FiltersComponentType) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState(null);
  const { patientInfo, setPatientInfo } = useContext(SessionContext);
  const [patients, setPatients] = useState<PatientDTO[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const timeoutId = useRef(null);

  const handleSearch = (text: string) => {
    setSearchTerm(text);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(async () => {
      if (text.length >= 1) {
        try {
          const response = await axios.get(`http://localhost:3000/patients/${text}`);
          setPatients(response.data);
        } catch (error) {
          console.error("Failed to fetch data:", error);
          setPatients([]);
        }
      }
    }, 500);
  };

  const handleDateChange = async (date: Date) => {
    setSearchDate(date);

    try {
      const formattedDate = date.toISOString().split('T')[0];
      const response = await axios.get(`http://localhost:3000/patients/date/${formattedDate}`);
      setPatients(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setPatients([]);
    }
  };

  const selectPatient = (patient: PatientDTO) => {
    setPatientInfo(patient);
    setSearchTerm("");
    setPatients([]);
  };

  useEffect(() => {
    if (Platform.OS !== 'web') {
      (async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status !== 'granted') {
          console.log("Permission to access calendar is required");
        }
      })();
    }
  }, []);

  return (
    <>
      <View className={`border-2 rounded-[30px] py-3 px-4 mb-3 w-4/5 flex-col items-center bg-white ${isPatientSelected ? 'border-lightGreen' : 'border-invalid'}`}>
        {patientInfo.name !== "" ? (
          <View className="flex-auto flex-row items-center w-full">
            <Text>{patientInfo.name}</Text>
            <TouchableOpacity onPress={() => setPatientInfo({ id: "", name: "", cpf: "", date_of_birth: "" })}>
              <AntDesign name="close" size={24} color="black" className="ml-2" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View className="flex flex-row items-center w-full">
              <View className="flex-row items-center w-2/4 border-r">
                <AntDesign name="search1" size={24} color="black" className="mr-2" />
                <TextInput
                  className="flex text-gray"
                  placeholder="Buscar por nome"
                  placeholderTextColor="gray"
                  value={searchTerm}
                  onChangeText={handleSearch}
                />
              </View>
              <View className="flex-row items-center w-2/4 pl-2">
                {Platform.OS === 'web' ? (
                    <DatePicker
                    selected={searchDate}
                    onChange={(date) => {
                        handleDateChange(date);
                        setSearchDate(date); 
                      }}
                    customInput={
                        <View className="flex-row">
                        <AntDesign name="calendar" size={24} color="black" className="ml-2" />
                        <TextInput 
                            className="flex ml-2 text-gray"
                            placeholder={searchDate ? searchDate.toLocaleDateString('pt-BR') : "Buscar por data"}
                            placeholderTextColor="gray"
                        />
                        </View>
                    }
                    />
                ) : (
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} className="flex-row items-center">
                    <AntDesign name="calendar" size={24} color="black" className="ml-2" />
                    <Text style={{ marginLeft: 5, color: 'gray' }}>{searchDate ? searchDate.toDateString() : "Buscar por data"}</Text>
                    </TouchableOpacity>
                )}
              </View>

            </View>
            {showDatePicker && Platform.OS !== 'web' && (
              <DateTimePicker
                value={searchDate}
                mode="date"
                display="default"
                onChange={(event, date) => {
                    handleDateChange(date);
                    setSearchDate(date); 
                  }}
              />
            )}
            {searchTerm !== "" && (
              <ScrollView className="w-full mt-1 border-t border-lightGreen max-h-32" showsVerticalScrollIndicator={false}>
                {patients.length ? (
                  patients.map((patient) => (
                    <TouchableOpacity className="w-full border-b border-lightGreen" onPress={() => selectPatient(patient)} key={patient.id}>
                      <Text className="ml-7">Nome: {patient.name}</Text>
                      <Text className="ml-7">CPF: {patient.cpf}</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text className="my-1 w-[190px] text-nowrap">Nenhum paciente encontrado</Text>
                )}
              </ScrollView>
            )}
          </>
        )}
      </View>
      {!isPatientSelected && <Text className="text-invalid px-10">Selecione paciente</Text>}
    </>
  );
}  
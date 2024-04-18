import { FlatList, Text, TextInput, View } from "react-native";
import React, { useContext, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import SessionContext from "../provider/sessionContext";

export function FilterInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const { selectedPatient, setSelectedPatient } = useContext(SessionContext);
  const [patients, setPatients] = useState<{ name: string; cpf: string }[]>([]);
  const timeoutId = useRef(null);

  const handleSearch = (text: string) => {
    setSearchTerm(text);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(async () => {
      if (text.length > 1) {
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

  const selectPatient = (name: string) => {
    setSelectedPatient(name);
    setSearchTerm("");
    setPatients([]);
  };

  return (
    <View className="border-2 border-lightGreen rounded-[30px] py-3 px-4 mb-3 flex-col items-center bg-white">
      {selectedPatient !== "" ? (
        <View className="w-[175] flex flex-row justify-between items-center">
          <Text>{selectedPatient}</Text>
          <TouchableOpacity onPress={() => setSelectedPatient("")}>
            <AntDesign name="close" size={24} color="black" className="ml-2" />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View className="flex flex-row">
            <AntDesign name="user" size={24} color="black" className="mr-2" />
            <TextInput
              className="flex-grow ml-2 text-gray"
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
                    onPress={() => selectPatient(patient.name)}
                    key={patient.name}
                  >
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
  );
}

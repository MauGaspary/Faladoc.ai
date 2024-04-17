import { FlatList, Text, TextInput, View } from "react-native";
import React, { useContext, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import SessionContext from "../provider/sessionContext";

export function FilterInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const {selectedPatient, setSelectedPatient} = useContext(SessionContext);
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
  
  console.log("selectedPatient", selectedPatient)

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
              className="flex-grow ml-2"
              placeholder="Pesquisar paciente..."
              value={searchTerm}
              onChangeText={handleSearch}
            />
          </View>

          <View>
            {searchTerm !== "" &&
              (patients.length ? (
                <FlatList
                  data={patients}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity className="border-y-1 border-[#95CACA]" onPress={() => selectPatient(item.name)}>
                      <Text>Nome: {item.name}</Text>
                      <Text>CPF: {item.cpf}</Text>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <Text className="my-2">Nenhum paciente encontrado</Text>
              ))}
          </View>
        </>
      )}
    </View>
  );
}
